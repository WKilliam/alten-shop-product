import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {ResponseModel} from '../../models/response/response';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private api = 'http://localhost:3000/api/products/';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});


  constructor(private readonly http: HttpClient) {
  }

  queryParamsConfig(page: number, size: number): HttpParams {
    let params = new HttpParams();
    if (page !== undefined && page !== null) {
      params = params.append('page', page.toString());
    } else {
      params = params.append('page', '0');
    }
    params = params.append('size', size.toString());
    params = params.append('sort', 'name,asc');
    return params;
  }


  getProducts(page: number, size: number): Observable<ResponseModel> {
    const params = this.queryParamsConfig(page, size);
    const options = {headers: this.headers, params};
    return this.http.get<ResponseModel>(this.api, options);
  }

  getSortBy(page: number, size: number, sortBy: string, value: string | number): Observable<ResponseModel> {
    let params = this.queryParamsConfig(page, size);
    params = sortBy !== 'inventory-status' ? params.set(sortBy, value.toString()) : params.set('inventoryStatus', value.toString());
    const url = `${this.api}search/${sortBy}`;
    const options = {headers: this.headers, params};
    return this.http.get<ResponseModel>(url, options);
  }

}
