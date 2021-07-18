import { Inject, Injectable, Optional } from '@angular/core';
import { timer } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { INTERVAL } from './pooling-config.model';

@Injectable({
  providedIn: 'root',
})
export class PoolingService {
  prefix = 'root';
  public pooling$ = timer(0, this.interval || 1000).pipe(shareReplay());

  constructor(@Optional() @Inject(INTERVAL) private interval: number) {}

  log() {
    console.log(`${this.prefix} --> Polling service `);
  }
}
