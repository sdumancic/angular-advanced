export interface ICountry {
  id: string;
  name: string;
}

export interface IState {
  id: number;
  name: string;
  countryId: string;
}
