import { InjectionToken } from '@angular/core';

export interface PoolingConfig {
  interval: number;
}

export const INTERVAL = new InjectionToken<number>('interval');
