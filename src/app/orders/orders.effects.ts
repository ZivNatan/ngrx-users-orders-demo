import { createEffect } from '@ngrx/effects';
import { Actions, ofType } from '@ngrx/effects';
import { inject, Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import * as OrdersActions from './orders.actions'

@Injectable()
export class OrdersEffects {
  private actions$ = inject(Actions);

  loadOrders$ = createEffect(() =>
    of([
      { id: 1, userId: 3, total: 100 },
      { id: 2, userId: 1, total: 200 },
      { id: 3, userId: 2, total: 150 }
    ]).pipe(
      delay(1000),
      map(orders => OrdersActions.loadOrdersSuccess({ orders }))
    )
  );
}
