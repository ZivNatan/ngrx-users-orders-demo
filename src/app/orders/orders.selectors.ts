import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ordersAdapter, OrdersState } from  './orders.state'
import { selectUsersState } from '../users/users.selectors';

export const selectOrdersState = createFeatureSelector<OrdersState>('orders');

const { selectAll } = ordersAdapter.getSelectors();

export const selectAllOrders = createSelector(
  selectOrdersState,
  selectAll
);


export const selectSelectedUserId = createSelector(
  selectUsersState,
  state => state.selectedUserId
);


export const selectSelectedUserTotalOrders = createSelector(
  selectAllOrders,
  selectSelectedUserId,
  (orders, selectedUserId) => {
    if (selectedUserId === null) return 0;

    return orders
      .filter(order => order.userId === selectedUserId)
      .reduce((sum, order) => sum + order.total, 0);
  }
);
