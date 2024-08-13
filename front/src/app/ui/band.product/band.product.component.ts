import {Component, Input, OnInit} from '@angular/core';
import {ProductModels} from '../../models/product/product.models';

@Component({
  selector: 'app-ui-band-product',
  template: `
    <div class="band-content">
      <span class="product-name">{{ productName }}</span>
      <span class="separator"></span>
      <span class="product-price">{{ productPrice | currency }}</span>
      <span class="separator"></span>
      <span class="product-category">{{ productCategory }}</span>
      <span class="separator"></span>
      <span class="product-status">{{ productInventoryStatus }}</span>
      <span class="separator"></span>
      <button pButton icon="pi pi-shopping-cart" type="button" class="square-btn"></button>
    </div>
  `,
  styleUrls: ['./band.product.component.scss']
})
export class BandProductComponent implements OnInit {

  @Input() products: ProductModels;

  productName: string;
  productDescription: string;
  productPrice: number;
  productCategory: string;
  productInventoryStatus: string;

  constructor() { }

  ngOnInit(): void {
    this.updateProductProperties();
  }

  updateProductProperties(){
    this.productName = this.products?.name || 'Default Name';
    this.productDescription = this.products?.description || 'Default Description';
    this.productPrice = this.products?.price || 0;
    this.productCategory = this.products?.category || 'Default Category';
    this.productInventoryStatus = this.products?.inventoryStatus || 'In Stock';
  }

}
