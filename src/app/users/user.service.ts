import { Injectable } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from './users.models';

@Injectable({ providedIn: 'root' })

export class UserService {
  getUserDetails(userId: number) {
   const users: User[] = [
      { id: 1, name:'Alice'},
      { id: 2, name:'Bob'},
      { id: 3, name:'Charlie'}
   ]
   const user  = users.find((user) => user.id == userId);
   if (!user) {
      return EMPTY;
    }
 
    return of(user).pipe(delay(1500)); // simulate API delay
  }
}
