import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from './users.models';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ].map(user => ({ ...user })); 

  getUsers(): Observable<User[]> {
    return of([...this.users]).pipe(delay(500)); 
  }

  getUserDetails(userId: number): Observable<User> {
    const user = this.users.find(u => u.id === userId);
    return user ? of({ ...user }).pipe(delay(500)) : EMPTY;
  }

  addUser(user: User): Observable<User> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = { ...user };
    } else {
      this.users = [...this.users, { ...user }]; 
    }
    return of({ ...user }).pipe(delay(500));
  }
}

