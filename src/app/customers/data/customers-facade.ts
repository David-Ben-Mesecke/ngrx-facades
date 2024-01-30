import { Injectable, inject } from '@angular/core';

import { Customer } from '@app/customers/model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { customersActions } from './customers.actions';
import { filterDefined } from '@app/shared';
import { fromCustomers } from './customers.selectors';
import { map } from 'rxjs/operators';

function deepClone<T>(source$: Observable<T>): Observable<T> {
  return source$.pipe(map((data) => structuredClone(data)));
}

@Injectable({ providedIn: 'root' })
export class CustomersFacade {
  isLoaded = false;
  _store = inject(Store);

  get customers$(): Observable<Customer[]> {
    this.#assertLoaded();
    return this._store.select(fromCustomers.selectAll);
  }

  byId(id: number): Observable<Customer> {
    this.#assertLoaded();

    return this._store
      .select(fromCustomers.selectById(id))
      .pipe(filterDefined, deepClone);
  }

  #assertLoaded() {
    if (!this.isLoaded) {
      this._store.dispatch(customersActions.load());
      this.isLoaded = true;
    }
  }

  remove(id: number) {
    this._store.dispatch(customersActions.remove({ id }));
  }

  update(customer: Customer) {
    this._store.dispatch(customersActions.update({ customer }));
  }

  add(customer: Customer) {
    this._store.dispatch(customersActions.add({ customer }));
  }
}
