import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Order } from './orders.models';

export interface OrdersState extends EntityState<Order> {}

export const ordersAdapter = createEntityAdapter<Order>();

export const initialOrdersState: OrdersState = ordersAdapter.getInitialState();
