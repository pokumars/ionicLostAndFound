import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Pic } from "../../interfaces/Pic";

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
  // ---------------- get user avatar -------------------------
  getAvatar(tag: string) {
    return this.http.get(this.baseUrl + 'tags/' +tag);
  }
  // upload file to server
  // send media to server
  sendMedia(formData: FormData, token: string): Observable<any> {
    return this.http.post(this.baseUrl + 'media', formData, {
      headers: { 'x-access-token': token }
    });
  }
  // add tag to media
  addTag(tag: string, file_id: number): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.post(this.baseUrl + 'tags', {
      "file_id": file_id,
      "tag": tag
    },{
      headers: { 'x-access-token': token }
    });
  }
  // get all the media
  getAllMedia(type: string): Observable<Pic[]> {
    return this.http.get<Pic[]>(this.baseUrl + 'tags/' + type);
  }
  // send comment
  sendComment(comment: string, file_id: number): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.post(this.baseUrl + 'comments', {
      "file_id": file_id,
      "comment": comment
    },{
      headers: { 'x-access-token': token }
    });
  }
  // get comments
  getComment(file_id: number): Observable<any> {
    return this.http.get(this.baseUrl + 'comments/file/' + file_id);
  }
  // get user data
  getUserData(id: number): Observable<any> {
    let token = localStorage.getItem('token');
    return this.http.get(this.baseUrl + 'users/' + id, {
      headers: { 'x-access-token': token }
    });
  }
  // get user's certain details
  getUserDetail(id: number, type?: string) {
    return new Promise(resolve => {
      this.getUserData(id).subscribe(res => {
        console.log(res);
        switch (type) {
          case 'name':
            resolve(res.username);
            break;
          case 'email':
            resolve(res.email);
            break;
          case 'full':
            resolve(res.full_name);
            break;
          default:
            resolve(res);
            break;
        }
      });
    });
  }
}
