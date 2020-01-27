import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService {
  constructor(public http: HttpClient) { }

  addUser(body:any) {
    return this.http.post(environment.ALERGHAST_ENDPOINT + `/register`, body);
  }

  login(body:any) {
    return this.http.post(environment.ALERGHAST_ENDPOINT + `/login`, body);
  }
}
