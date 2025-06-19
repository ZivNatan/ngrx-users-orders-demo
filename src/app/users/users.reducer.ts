import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { usersAdapter, initialUsersState } from './users.state';

export const usersReducer = createReducer(
  initialUsersState,

  // Load Users
  on(UsersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
  })),

  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, { ...state, loading: false })
  ),

  on(UsersActions.loadUsersFailure, (state) => ({
    ...state,
    loading: false,
  })),

  // Select user
  on(UsersActions.selectUser, (state, { userId }) => ({
    ...state,
    selectedUserId: userId,
  })),

  // Load user details
  on(UsersActions.loadUserDetailsSuccess, (state, { user }) =>
    usersAdapter.upsertOne(user, { ...state, loading: false })
  ),

  on(UsersActions.loadUserDetailsFailure, (state) => ({
    ...state,
    loading: false,
  })),

  // Add user success
  on(UsersActions.addUserSuccess, (state, { user }) =>
    usersAdapter.upsertOne(user, {
      ...state,
      loading: false,
    })
  ),

  // Add user failed
  on(UsersActions.addUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update user
  on(UsersActions.updateUser, (state, { user }) =>
    usersAdapter.updateOne({ id: user.id, changes: user }, state)
  ),

  // Delete user
  on(UsersActions.deleteUser, (state, { userId }) =>
    usersAdapter.removeOne(userId, state)
  ),

  on(UsersActions.updateUserSuccess, (state, { user }) =>
    usersAdapter.upsertOne(user, { ...state })
  )
);
