
import { createSelector } from '@ngrx/store';
import { selectSelectedUser } from '../../users/users.selectors';
import { selectSelectedUserTotalOrders } from '../../orders/orders.selectors';

export const selectSelectedUserNameAndTotal = createSelector(
  selectSelectedUser,
  selectSelectedUserTotalOrders,
  (user, total) => ({
    name: user?.name ?? 'No user selected',
    total
  })
);
