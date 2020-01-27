import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable()
export class AlerghastService {

  constructor(public http: HttpClient) { }

  getBarcodeAnalisis(code:any) {
    return this.http.get(environment.ALERGHAST_ENDPOINT + `/product`);
  }

}
