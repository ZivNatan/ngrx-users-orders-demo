import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import * as UsersSelectors from '../../users/users.selectors';
import * as OrdersSelectors from '../../orders/orders.selectors';

import { toSignal } from '@angular/core/rxjs-interop';
import { UserTotalComponent } from '../user-total/user-total.component';
import { UserNameComponent } from '../user-name/user-name.component';


@Component({
  selector: 'app-user-orders',
  standalone: true,
  imports: [CommonModule, UserTotalComponent, UserNameComponent],
  templateUrl: './user-orders.component.html'

})
export class UserOrdersComponent {
  private store = inject(Store);

  user = toSignal(this.store.select(UsersSelectors.selectSelectedUser), { initialValue: null });
  total = toSignal(this.store.select(OrdersSelectors.selectSelectedUserTotalOrders), { initialValue: 0 });
}
