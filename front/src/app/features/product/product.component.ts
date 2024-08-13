import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../core/http/http';
import {any} from 'codelyzer/util/function';

@Component({
  selector: 'app-product',
  template: `
    <div class="features-product-container">
      <app-ui-filter-tab class="filter-content"></app-ui-filter-tab>
      <app-ui-table [page]="0" [link]="null" class="table-content"></app-ui-table>
    </div>
  `,
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  data: any;

  constructor(private readonly http: HttpService) {
  }


  ngOnInit(): void {

  }

}
