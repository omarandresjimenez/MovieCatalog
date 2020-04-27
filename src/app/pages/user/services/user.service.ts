import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { shareReplay, tap, catchError } from 'rxjs/operators';

import { UserSession } from 'src/app/models/userSession';
import { UserLogin, UserModel } from 'src/app/models/userLogin';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userSession$ = new Observable<UserSession>();
  private userSession = new BehaviorSubject<UserSession>(null);

  public newUserAdded$ = new Observable();
  private newUserAdded = new Subject();
  constructor(private service: ApiService) {
    this.userSession$ = this.userSession.asObservable();
    this.newUserAdded$ = this.newUserAdded.asObservable();
  }

  public authenticate(userInfo: UserLogin): void {

    this.service.authenticate(userInfo).pipe(shareReplay(1),
      catchError( err => throwError(err))).
      subscribe((res: UserSession) => this.userSession.next(res));
  }

  public notifyNewUser(): void {
    this.newUserAdded.next();
  }

  public getUsers(): Observable<[UserSession]> {
    return this.service.getUsers();
  }

  public createUser(userInfo: UserModel): Observable<boolean> {
    return this.service.createUser(userInfo);
  }

  public updateUser(userInfo: UserModel): Observable<boolean> {
    return this.service.updateUser(userInfo);
  }

  public deleteUser(userName: string): Observable<boolean> {
    return this.service.deleteUser(userName);
  }

  public closeSession() {
    this.userSession.next(null);
  }
}
