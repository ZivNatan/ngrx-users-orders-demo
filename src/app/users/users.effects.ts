import { inject, Injectable } from '@angular/core';
import { selectSelectedUserId } from './users.selectors';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UsersActions from './users.actions';
import { of } from 'rxjs';
import { delay, map, switchMap, catchError, filter, distinctUntilChanged } from 'rxjs/operators';
import { UserService } from './user.service';
import { User } from './users.models';


@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private store = inject(Store);


 loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() =>
        of([
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
          { id: 3, name: 'Charlie' }
        ]).pipe(
          delay(1000),
          map(users => UsersActions.loadUsersSuccess({ users })),
          catchError(error => of(UsersActions.loadUsersFailure({ error })))
        )
      )
    );
  });

loadSelectedUserDetails$ = createEffect(() =>
  this.store.select(selectSelectedUserId).pipe(
    filter((id): id is number => id !== null ),
    distinctUntilChanged(),
    switchMap(userId =>
      this.userService.getUserDetails(userId).pipe(
        map((user) => UsersActions.loadUserDetailsSuccess({user})),
        catchError(error => of(UsersActions.loadUserDetailsFailure({ error })))
      )
    )
  )
);

}



