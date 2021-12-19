import { Injectable } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { CountryStateService } from '../data-access/country-state.service';
import { ICountry, IState } from '../data-access/Country.model';
import { SimpleAddressFormService } from '../form/simple-address-form.service';

@Injectable()
export class SimpleAddressFacadeService {
  constructor(
    private countryStateService: CountryStateService,
    private formService: SimpleAddressFormService
  ) {}
  countries$: Observable<ICountry[]> = this.countryStateService.countries$();
  states$: Observable<IState[]>;

  loadStates$(countryId: string): Observable<IState[]> {
    this.formService.form.patchValue({
      state: null,
    });
    return this.countryStateService.states$(countryId);
  }

  createAddressForm() {
    return this.formService.createAddressForm();
  }

  streetControl(): FormControl {
    return this.formService.form.get('street') as FormControl;
  }

  cityControl(): FormControl {
    return this.formService.form.get('city') as FormControl;
  }

  countryControl(): FormControl {
    return this.formService.form.get('country') as FormControl;
  }
}
