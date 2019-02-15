import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  login(username: string, password: string) {
    const body ={
      "username": username,
      "password": password
    }
    return this.http.post(this.baseUrl+ '/login', body);

  }

}
