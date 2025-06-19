import { createAction, props } from '@ngrx/store';
import { User } from './users.models';

export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: any }>()
);

export const selectUser = createAction(
  '[Users] Select User',
  props<{ userId: number }>()
);

export const loadUserDetailsSuccess = createAction(
  '[Users] Load User Details Success',
  props<{ user: User }>()
);

export const loadUserDetailsFailure = createAction(
  '[Users] Load User Details Failure',
  props<{ error: any }>()
);

export const addUser = createAction('[Users] Add User', props<{ user: User }>());

export const updateUser = createAction(
  '[Users] Update User',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ userId: number }>()
);

