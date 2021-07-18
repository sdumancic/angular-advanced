import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StateService<T> {
  private state$: BehaviorSubject<T> = new BehaviorSubject<T>(null);

  public get snapshot(): T {
    return this.state$.getValue();
  }

  constructor() {}

  public select<K>(mapFn: (state: T) => K): Observable<K> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  public setState(newState: Partial<T>) {
    this.state$.next({
      ...this.snapshot,
      ...newState,
    });
  }

  public resetState(newState?: T): void {
    newState ? this.state$.next({ ...newState }) : this.state$.next(null);
  }
}
