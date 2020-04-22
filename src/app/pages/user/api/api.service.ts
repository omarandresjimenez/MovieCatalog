import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { UserLogin, UserModel } from 'src/app/models/userLogin';
import { Observable } from 'rxjs';
import { UserSession } from 'src/app/models/userSession';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly BASEURL = environment.baseUrlApiUser;
  constructor(private http: HttpClient) { }

  public authenticate(userLogin: UserLogin): Observable<UserSession> {
    return this.http.post<UserSession>(this.BASEURL + 'useritems/authenticate', userLogin);
  }

  public createUser(userModel: UserModel): Observable<boolean> {
    const params = {
      userName: userModel.userName,
      userPassword: userModel.userPassword,
      userRole: userModel.userAdmin ? 'admin' : 'user',
    };
    return this.http.post<boolean>(this.BASEURL + 'useritems', params);
  }

  public updateUser(userModel: UserModel): Observable<boolean> {
    const params = {
      userName: userModel.userName,
      userPassword: userModel.userPassword,
      userRole: userModel.userAdmin ? 'admin' : 'user',
    };
    return this.http.put<boolean>(this.BASEURL + 'useritems/' + userModel.userName, params);
  }

  public deleteUser(userName: string): Observable<boolean> {
    return this.http.delete<boolean>(this.BASEURL + 'useritems/' + userName);
  }

  public getUsers(): Observable<[UserSession]> {
    return this.http.get<any>(this.BASEURL + 'useritems');
  }
}
