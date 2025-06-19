import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

import * as UsersSelectors from '../../users/users.selectors';
import * as UsersActions from '../../users/users.actions';
import { UserOrdersComponent } from '../user-orders/user-orders.component';
import { User } from '../../users/users.models';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, UserOrdersComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  private store = inject(Store);

  loading = toSignal(this.store.select(UsersSelectors.selectUsersLoading), { initialValue: false });
  users = toSignal(this.store.select(UsersSelectors.selectAllUsers), {
    initialValue: [],
  });

  selectedUserId = toSignal(
    this.store.select(UsersSelectors.selectSelectedUserId)
  );

  userFormData: Partial<User> = { id: 0, name: '' };
  showForm = false;

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

selectUser(userId: number ) {
  if (this.selectedUserId() === userId) {
    this.store.dispatch(UsersActions.selectUser({ userId: -1 })); 
  } else {
    this.store.dispatch(UsersActions.selectUser({ userId }));
  }
}


  deleteUser(userId: number) {
    this.store.dispatch(UsersActions.deleteUser({ userId }));
  }

  showAddUserForm() {
    this.userFormData = { id: 0, name: '' };
    this.showForm = true;
  }

  editUser(user: User, e:any) {
    if (!this.showForm && user.id == this.selectedUserId() ) {
      e.stopPropagation();
    }
    this.userFormData = { ...user };
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.userFormData = { id: 0, name: '' };
  }

  submitUser() {
    const user = this.userFormData as User;
    if (user.name && user.id !== undefined) {
      this.store.dispatch(UsersActions.addUser({ user }));
      this.userFormData = { id: 0, name: '' };
      this.showForm = false;
    }
  }
}
