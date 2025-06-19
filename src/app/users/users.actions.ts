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

export const addUser = createAction(
  '[Users] Add User',
  props<{ user: User }>()
);

export const addUserSuccess = createAction(
  '[Users] Add User Success',
  props<{ user: User; updated: boolean }>()
);

export const addUserFailure = createAction(
  '[Users] Add User Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[Users] Update User',
  props<{ user: User }>()
);

export const deleteUser = createAction(
  '[Users] Delete User',
  props<{ userId: number }>()
);

export const deleteUserSuccess = createAction(
  '[Users] Delete User Success',
  props<{ userId: number }>()
);

export const updateUserSuccess = createAction(
  '[Users] Update User Success',
  props<{ user: User }>()
);
