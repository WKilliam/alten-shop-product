import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../core/http/http';
import {ResponseModel} from '../../models/response/response';

@Component({
  selector: 'app-product',
  template: `
    <div class="features-product-container">
      <app-ui-filter-tab class="filter-content"></app-ui-filter-tab>
      <app-ui-table *ngIf="data" [data]="data" class="table-content"></app-ui-table>
      <ng-container *ngIf="!data">
        <app-ui-spinner-loading class="table-content"></app-ui-spinner-loading>
      </ng-container>
      <app-ui-pagination class="pagination-content"></app-ui-pagination>
    </div>
  `,
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  data: any;
  constructor(private readonly http: HttpService) {
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  private fetchProducts(): void {
    this.http.getProducts(0, 20).subscribe((data: ResponseModel) => {
      this.data = data;
    });
  }

}
