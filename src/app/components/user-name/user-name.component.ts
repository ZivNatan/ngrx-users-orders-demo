import { Component, inject  } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectSelectedUser } from '../../users/users.selectors';

@Component({
  selector: 'app-user-name',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-name.component.html'
  

})
export class UserNameComponent {
  private store = inject(Store);
  user = toSignal(this.store.select(selectSelectedUser), { initialValue: null });
}
