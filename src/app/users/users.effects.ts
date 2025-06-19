import { inject, Injectable } from '@angular/core';
import {
  selectAllUsers,
  selectSelectedUserId,
  selectUserEntities,
} from './users.selectors';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
import { of } from 'rxjs';
import {
  delay,
  map,
  switchMap,
  catchError,
  filter,
  distinctUntilChanged,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { UserService } from './user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private store = inject(Store);
  private toastr = inject(ToastrService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users) => UsersActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(UsersActions.loadUsersFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadSelectedUserDetails$ = createEffect(() =>
    this.store.select(selectSelectedUserId).pipe(
      filter((id): id is number => id !== null),
      distinctUntilChanged(),
      switchMap((userId) =>
        this.userService.getUserDetails(userId).pipe(
          map((user) => UsersActions.loadUserDetailsSuccess({ user })),
          catchError((error) =>
            of(UsersActions.loadUserDetailsFailure({ error }))
          )
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.addUser),
      withLatestFrom(this.store.select(selectUserEntities)),
      switchMap(([{ user }, userEntities]) => {
        const isUpdate = !!userEntities[user.id];

        return this.userService.addUser(user).pipe(
          map((updatedUser) =>
            UsersActions.addUserSuccess({
              user: updatedUser,
              updated: isUpdate,
            })
          ),
          catchError((error) =>
            of(UsersActions.addUserFailure({ error: error.message }))
          )
        );
      })
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      switchMap(({ userId }) =>
        of(userId).pipe(
          delay(500),
          map(() => UsersActions.deleteUserSuccess({ userId }))
        )
      )
    )
  );

  showAddUserSuccessToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.addUserSuccess),
        tap(({ updated }) => {
          this.toastr.success(
            updated
              ? 'User updated successfully!'
              : 'User created successfully!'
          );
        })
      ),
    { dispatch: false }
  );

  showAddUserFailureToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.addUserFailure),
        tap(({ error }) => this.toastr.error(`שגיאה: ${error}`))
      ),
    { dispatch: false }
  );
}
