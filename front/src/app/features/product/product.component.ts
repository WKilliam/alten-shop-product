import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../core/http/http';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  data: any;

  constructor(private readonly http: HttpService) {
  }


  ngOnInit(): void {
    this.http.getProducts(0).subscribe((data) => {
      console.log(data);
      this.data = data;
    });
  }

}
