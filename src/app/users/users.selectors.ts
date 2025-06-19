import { inject } from '@angular/core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState, usersAdapter } from './users.state';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  usersAdapter.getSelectors().selectAll
);

export const selectSelectedUserId = createSelector(
  selectUsersState,
  (state) => state.selectedUserId
);

export const selectEntities = createSelector(
  selectUsersState,
  usersAdapter.getSelectors().selectEntities
);

export const selectIds = createSelector(
  selectUsersState,
  usersAdapter.getSelectors().selectIds
);

export const selectSelectedUser = createSelector(
  selectEntities,
  selectSelectedUserId,
  (entities, selectedId) => (selectedId !== null ? entities[selectedId] : null)
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  (state) => state.loading
);

export const selectUserEntities = createSelector(
  selectUsersState,
  (state) => state.entities
);

export function injectUsersSelectors() {
  const select = inject(Store<any>).select;

  return {
    users: toSignal(select(selectAllUsers)),
    selectedUser: toSignal(select(selectSelectedUser)),
  };
}
