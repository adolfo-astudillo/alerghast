import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class OpenFoodService {

  constructor(public http: HttpClient) { }

  getProductByBarcode(code:any) {
    return this.http.get(`https://world.openfoodfacts.org/api/v0/product/${code}.json`);
  }

}
