import { HttpClient } from '@angular/common/http';
import {
  ApplicationInitStatus,
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FirstComponent implements OnInit, DoCheck {
  obsValue: number;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private appRef: ApplicationRef
  ) {}

  ngDoCheck(): void {
    console.log('docheck');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
    });
    this.form.patchValue({
      firstname: 'John',
      lastname: 'doe',
    });
  }

  fetchObs() {
    this.http
      .get<{ firstname: string; lastname: string }>(`../assets/test-data.json`)
      .subscribe((res) => {
        this.form.patchValue({
          firstname: res.firstname,
          lastname: res.lastname,
        });
        //this.appRef.tick();
      });
  }
}
