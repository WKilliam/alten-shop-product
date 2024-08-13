import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private api = 'http://localhost:3000/api/products/';
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private readonly http: HttpClient) {
  }

  queryParamsConfig(page: number){
    let params = new HttpParams();
    if (page !== undefined && page !== null) {
      params = params.append('page', page.toString());
    }else{
      params = params.append('page', '0');
    }
    params = params.append('size', '10');
    params = params.append('sort', 'name,asc');
    return params;
  }


  getProducts(page: number) {
    console.log('test');
    const params = this.queryParamsConfig(page);
    const options = { headers: this.headers, params };
    return this.http.get(this.api, options);
  }

}
