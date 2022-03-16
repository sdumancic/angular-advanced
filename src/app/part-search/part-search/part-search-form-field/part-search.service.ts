import { Injectable } from '@angular/core';
import {IPartSearchFormFieldValue} from "./part-search-form-field.component";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PartSearchService {

  constructor() { }

  private parts: IPartSearchFormFieldValue[] = [
    { franchiseCode: '91',partNumber: '1234', partDescription: 'Product 91-1234'},
    { franchiseCode: '92',partNumber: '1234', partDescription: 'Product 92-1234'},
    { franchiseCode: '95',partNumber: '1234', partDescription: 'Product 95-1234'}
  ]

  search( franchiseCode: string, partNumber: string){
    const ind = this.parts.findIndex(part => part.franchiseCode === franchiseCode && part.partNumber === partNumber);
    if (ind === -1) {
      return of(null);
    } else {
      return of (this.parts[ind]);
    }
  }
}
