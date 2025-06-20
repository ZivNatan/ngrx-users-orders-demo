import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectSelectedUserTotalOrders } from '../../../orders/orders.selectors';

@Component({
  selector: 'app-user-total',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'user-total.component.html'

  
})
export class UserTotalComponent {
  private store = inject(Store);
  total = toSignal(this.store.select(selectSelectedUserTotalOrders), { initialValue: 0 });
}
