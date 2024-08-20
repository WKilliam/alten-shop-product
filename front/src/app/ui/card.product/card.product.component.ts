import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ProductModels } from '../../models/product/product.models';

@Component({
  selector: 'app-ui-card-product',
  template: `
    <div class="card">
      <div class="card-header">
        <p class="title">{{ productName }}</p>
        <p class="product-category">{{ productCategory }}</p>
      </div>
      <div class="card-body">
        <img [src]="productImage" alt="{{ productName }}" class="product-image">
        <div class="info">
          <p class="describe">{{ productDescription }}</p>
          <div class="status-product">
            <p class="product-inventory">{{ productInventoryStatus }}</p>
            <p class="product-price">{{ productPrice | currency }}</p>
          </div>
          <button pButton icon="pi pi-shopping-cart" type="button" class="square-btn"></button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./card.product.component.scss']
})
export class CardProductComponent implements OnInit, OnChanges {

  @Input() product: ProductModels;

  productName: string;
  productDescription: string;
  productPrice: number;
  productCategory: string;
  productInventoryStatus: string;
  productImage: string;
  productCode = '123456';

  constructor() {}

  ngOnInit(): void {
    this.updateProductProperties();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product) {
      this.updateProductProperties();
    }
  }

  private updateProductProperties(): void {
    this.productCode = this.product?.code || '123456';
    this.productName = this.product?.name || 'Default Name';
    this.productDescription = this.product?.description || 'Default Description';
    this.productPrice = this.product?.price || 0;
    this.productCategory = this.product?.category || 'Default Category';
    this.productInventoryStatus = this.product?.inventoryStatus || 'In Stock';
    this.productImage = this.product?.image || 'https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png';
  }
}
