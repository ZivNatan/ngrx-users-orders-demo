import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from './orders.actions';
import { ordersAdapter, initialOrdersState } from './orders.state';

export const ordersReducer = createReducer(
  initialOrdersState,

  on(OrdersActions.loadOrdersSuccess, (state, { orders }) =>
    ordersAdapter.setAll(orders, state)
  )
);
