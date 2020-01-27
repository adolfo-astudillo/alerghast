import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class AlerghastService {

  constructor(public http: HttpClient) { }

  getBarcodeAnalisis(code:any) {
    return this.http.get(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
  }

}
