import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { User } from './users.models';

export interface UsersState extends EntityState<User> {
  selectedUserId: number | null;
  loading: boolean;
}

export const usersAdapter = createEntityAdapter<User>();

export const initialUsersState: UsersState = usersAdapter.getInitialState({
  selectedUserId: null,
  loading: false
});
