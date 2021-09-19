import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { combineLatest, from, of } from 'rxjs';
import { concatMap, delay, map, mergeMap, tap } from 'rxjs/operators';
import { ageAsyncValidator } from './age-async-validator';
import { forbiddenNameValidator } from './forbidden-name.directive';

@Component({
  selector: 'app-form-with-async-validator',
  templateUrl: './form-with-async-validator.component.html',
  styleUrls: ['./form-with-async-validator.component.scss'],
})
export class FormWithAsyncValidatorComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        forbiddenNameValidator(/bob/i),
      ]),
      age: [
        null,
        {
          validators: [Validators.required],
          asyncValidators: [ageAsyncValidator()],
          updateOn: 'blur',
        },
      ],
    });
  }

  onSubmit() {
    for (let i in this.form.controls) {
      this.form.controls[i].markAsTouched();
    }

    this.checkIfFormPassesValidation(this.form).then((valid) =>
      console.log('Form is valid? ', valid)
    );

    this.combineLatestTest();
  }

  combineLatestTest() {
    console.log('combinelatest test');
    const first$ = from([1, 2, 3]).pipe(
      map((item) => of(item)),
      concatMap((item$) => item$)
    );
    const second$ = from([4, 5, 6]).pipe(
      map((item) => of(item)),
      concatMap((item$) => item$)
    );
    combineLatest([first$, second$])
      .pipe(
        tap(([a, b]) => {
          console.log(a, b);
        })
      )
      .subscribe();
  }

  checkIfFormPassesValidation(formGroup: FormGroup) {
    const syncValidationErrors = Object.keys(formGroup.controls)
      .map((c) => {
        const control = formGroup.controls[c];
        return !control.validator ? null : control.validator(control);
      })
      .filter((errors) => !!errors);
    console.log('syncValidationErrors=', syncValidationErrors);
    return combineLatest(
      Object.keys(formGroup.controls).map((c) => {
        const control = formGroup.controls[c];
        return !control.asyncValidator
          ? of(null)
          : control.asyncValidator(control);
      })
    )
      .pipe(
        tap((asyncValidationErrors) =>
          console.log(
            'asyncValidationErrors=',
            asyncValidationErrors.filter((errors) => !!errors)
          )
        ),
        map((asyncValidationErrors) => {
          const hasErrors = [
            ...syncValidationErrors,
            ...asyncValidationErrors.filter((errors) => !!errors),
          ].length;
          if (hasErrors) {
            // ensure errors display in UI...
            Object.keys(formGroup.controls).forEach((key) => {
              formGroup.controls[key].markAsTouched();
              formGroup.controls[key].updateValueAndValidity();
            });
          }
          return !hasErrors;
        })
      )
      .toPromise();
  }
}
