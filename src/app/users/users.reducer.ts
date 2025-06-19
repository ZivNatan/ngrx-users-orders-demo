import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';
import { usersAdapter, initialUsersState } from './users.state';

export const usersReducer = createReducer(
  initialUsersState,

  // Load Users
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    usersAdapter.setAll(users, {...state, loading: false})
  ),

  // select user
  on(UsersActions.selectUser, (state, { userId }) => ({
     ...state,
     selectedUserId: userId
   })) ,

  // load user details (upsert)
   on(UsersActions.loadUserDetailsSuccess, (state, { user }) =>
     usersAdapter.upsertOne(user, state)
  ),

   // Add user (prevent duplicates)
  on(UsersActions.addUser, (state, { user }) =>
    usersAdapter.upsertOne(user, state)
  ),

  // Update user
  on(UsersActions.updateUser, (state, { user }) =>
    usersAdapter.updateOne({ id: user.id, changes: user }, state)
  ),

  // Delete user
  on(UsersActions.deleteUser, (state, { userId }) =>
    usersAdapter.removeOne(userId, state)
  ),

  
);
