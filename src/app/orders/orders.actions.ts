import { createAction, props } from '@ngrx/store';
import { Order } from './orders.models';

export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ orders: Order[] }>()
);
