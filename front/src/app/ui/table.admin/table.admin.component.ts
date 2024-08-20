import {Component, ElementRef, HostListener, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ProductModels} from '../../models/product/product.models';
import {ProductEditModel} from '../../models/product.edit/product.edit';
import {FormControl, FormGroup} from '@angular/forms';
import {StatAppService} from '../../services/stat.app/stat.app.service';
import {DataManagerAdminService} from '../../services/data.manager.admin/data.manager.admin.service';

@Component({
  selector: 'app-ui-table-admin',
  template: `
    <div class="table-container">
      {{ isLoading}}
      <div class="table-wrapper">
        <table>
          <thead>
          <tr>
            <th class="checkbox-col"></th>
            <th>Code</th>
            <th>Name</th>
            <th>Inventory</th>
            <th>Actions</th>
          </tr>
          <tr class="filters" [formGroup]="formGroup">
            <td></td>
            <td>
              <input type="text" placeholder="Filter by code" formControlName="code"/>
            </td>
            <td>
              <input type="text" placeholder="Filter by name" formControlName="name"/>
            </td>
            <td>
              <select formControlName="inventoryStatus">
                <option value="">All</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </td>
            <td></td>
          </tr>
          </thead>
        </table>
      </div>
      <div class="table-body-wrapper" (scroll)="onScroll($event)">
        <table>
          <tbody>
          <tr *ngFor="let product of productsTab; let i = index">
            <td class="checkbox-col">
              <input type="checkbox" [(ngModel)]="product.selectedProduct"
                     (click)="addOrRemoveProductCheckBox(product)"/>
            </td>
            <td>{{ product.code }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.inventoryStatus }}</td>
            <td class="actions-row">
              <button class="btn--edit-icon" (click)="product.onEdit()">
                <i class="pi pi-pencil"></i>
              </button>
              <button class="btn--delete-icon" (click)="product.onDelete()">
                <i class="pi pi-trash"></i>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['./table.admin.component.scss']
})
export class TableAdminComponent implements OnInit {

  formGroup = new FormGroup({
    code: new FormControl(''),
    name: new FormControl(''),
    inventoryStatus: new FormControl(''),
  });

  protected isLoading = false;
  productsTab: ProductEditModel[] = [];
  selectedProduct: ProductEditModel[] = [];

  constructor(
    private readonly dataManagerAdminService: DataManagerAdminService,
    private readonly stateManagerService: StatAppService) {
  }

  ngOnInit(): void {
    this.watchDataChanging();
  }

  editProduct(productId: number): void {
    console.log('Editing product with ID:', productId);
  }

  deleteProduct(productId: number): void {
    console.log('Deleting product with ID:', productId);
  }

  addOrRemoveProductCheckBox(product: ProductEditModel): void {
    product.selectedProduct = !product.selectedProduct;
    const productIndex = this.productsTab.findIndex((p) => p.id === product.id);
    this.productsTab[productIndex] = product;
    const selectedProductIndex = this.selectedProduct.findIndex((p) => p.id === product.id);
    if (product.selectedProduct) {
      this.selectedProduct.push(product);
    } else {
      this.selectedProduct.splice(selectedProductIndex, 1);
    }
  }

  onScroll(event: any): void {
    const element = event.target;
    const threshold = 25;
    this.stateManagerService.getLimitElementRolling().subscribe(limit => {
      if (this.productsTab.length >= limit) {
        console.log('All items have been loaded. No more data to load.');
        return;
      }

      const remainingItems = this.productsTab.length -
        (element.scrollTop + element.clientHeight) / (element.scrollHeight / this.productsTab.length);

      if (remainingItems <= threshold && !this.isLoading) {
        console.log('Loading next data...');
        this.isLoading = true;
        this.stateManagerService.incrementMoreDataValue();
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
      }
    });
  }

  private watchDataChanging() {
    this.dataManagerAdminService.getProducts().subscribe((products) => {
      this.productsTab = products.map(product => {
        const selectedProduct = this.selectedProduct.find(p => p.id === product.id);
        return {
          ...product,
          selectedProduct: !!selectedProduct,
          onEdit: () => this.editProduct(product.id),
          onDelete: () => this.deleteProduct(product.id),
        };
      });
      this.selectedProduct = this.productsTab.filter(product => product.selectedProduct);
    });
  }
}
