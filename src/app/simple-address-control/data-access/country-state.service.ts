import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountry, IState } from './Country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryStateService {
  constructor(private http: HttpClient) {}

  countries$(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('http://localhost:3000/countries');
  }

  states$(countryId: string): Observable<IState[]> {
    return this.http.get<IState[]>(
      `http://localhost:3000/states?countryId=${countryId}`
    );
  }
}
