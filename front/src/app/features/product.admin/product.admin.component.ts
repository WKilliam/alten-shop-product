import {Component, OnInit} from '@angular/core';
import {ProductModels} from '../../models/product/product.models';

@Component({
  selector: 'app-product.admin',
  template: `
    <div class="features-product-admin-container">
      <app-ui-band-edit-product class="filter-admin-content"></app-ui-band-edit-product>
      <app-ui-table-admin *ngIf="isData" class="table-admin-content"></app-ui-table-admin>
      <ng-container *ngIf="!isData">
        <app-ui-spinner-loading class="table-table-admin-content"></app-ui-spinner-loading>
      </ng-container>
    </div>
  `,
  styleUrls: ['./product.admin.component.scss']
})
export class ProductAdminComponent implements OnInit {

  product: ProductModels = {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 100,
    quantity: 10,
    category: 'Category 1',
    inventoryStatus: 'In Stock',
    image: 'https://www.primefaces.org/primeng/showcase/assets/showcase/images/demo/product',
    rating: 4,
    code: 'P1001'
  };

  isData: any = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
