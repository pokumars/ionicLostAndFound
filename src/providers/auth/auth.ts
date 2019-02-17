import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interface/user';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  baseUrl= 'https://media.mw.metropolia.fi/wbma';

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }
  // ------------------------- concerning users -------------------------------
  // for logging in
  login(username: string, password: string): Observable<any> {
    const body ={
      "username": username,
      "password": password
    };
    return this.http.post(this.baseUrl+ '/login', body);
  }
  // check user name existence
  checkUsername(input: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/users/username/' + input);
  }
  // register new user
  registerUser(data: User) {
    return this.http.post(this.baseUrl + '/users', data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
