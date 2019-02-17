import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  baseUrl = 'https://media.mw.metropolia.fi/wbma/';

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getAvatar(tag: string) {
    return this.http.get(this.baseUrl + 'tags/' +tag);
  }

}
