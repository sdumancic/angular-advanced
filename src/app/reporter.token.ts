import { InjectionToken } from '@angular/core';

export interface IReporter {
  report: () => void;
}

export const REPORTERS = new InjectionToken<IReporter>('reporters');
