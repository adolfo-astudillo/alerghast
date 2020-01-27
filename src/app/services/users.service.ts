import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class UsersService {
  constructor(public http: HttpClient) { }

  addUser(body:any) {
    return this.http.post(`http://192.168.43.248:8090/register`, body);
  }

  login(body:any) {
    return this.http.post(`http://192.168.43.248:8090/addUser`, body);
  }
}
