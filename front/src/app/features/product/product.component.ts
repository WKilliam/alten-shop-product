import {Component, OnInit} from '@angular/core';
import {DataManagerService} from '../../services/data.manager/data.manager.service';
import {ProductModels} from '../../models/product/product.models';

@Component({
  selector: 'app-product',
  template: `
    <div class="features-product-container">
      <app-ui-filter-tab class="filter-content"></app-ui-filter-tab>
      <app-ui-table *ngIf="isData" class="table-content"></app-ui-table>
      <ng-container *ngIf="!isData">
        <app-ui-spinner-loading class="table-content"></app-ui-spinner-loading>
      </ng-container>
      <app-ui-pagination class="pagination-content"></app-ui-pagination>
    </div>
  `,
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isData = false;

  constructor(private readonly dataManager: DataManagerService) {
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  private fetchProducts(): void {
    this.dataManager.initCall();
    this.dataManager.getData().subscribe((value: ProductModels[]) => {
      this.isData = value.length !== 0;
    });
  }
}
