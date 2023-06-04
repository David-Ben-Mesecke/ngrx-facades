import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Customer } from '@app/customers/model';

export const customersActions = createActionGroup({
  source: 'Customers',
  events: {
    load: emptyProps(),
    loaded: props<{ customers: Customer[]; pageCount: number }>(),
    add: props<{ customer: Customer }>(),
    added: props<{ customer: Customer }>(),
    update: props<{ customer: Customer }>(),
    updated: props<{ customer: Customer }>(),
    remove: props<{ id: number }>(),
    removed: emptyProps(),
    'next page': emptyProps(),
    'next page success': props<{ customers: Customer[] }>(),
    'previous page': emptyProps(),
    'previous page success': props<{ customers: Customer[] }>(),
  },
});
