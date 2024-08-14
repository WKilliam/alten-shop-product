import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ProductModels } from '../../models/product/product.models';
import { ResponseModel } from '../../models/response/response';
import {DataManagerService} from '../../services/data.manager/data.manager.service';

@Component({
  selector: 'app-ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges , OnInit{

  @Input() data;
  page = 0;
  displayMode = true;
  private itemsElementsCount =  5;
  products: ProductModels[] = [];

  constructor(
    private readonly dataManager: DataManagerService
  ) { }

  ngOnInit(): void {
    this.products = this.data.data;
    this.page = this.data.page;
    this.dataManager.setCurrentPage(this.page);
    this.dataManager.setTotalPages(this.data.totalPages);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataManager.getViewMode().subscribe((value) => {
      this.displayMode = value;
    });
  }

  // private fetchProducts(): void {
  //   const instanceItems = this.displayMode ? 20 : 40;
  //   this.http.getProducts(this.page, instanceItems).subscribe((data: ResponseModel) => {
  //     this.products = data.data;
  //   });
  // }

  getRows(products: ProductModels[]): ProductModels[][] {
    const rows: ProductModels[][] = [];
    for (let i = 0; i < products.length; i += this.itemsElementsCount) {
      rows.push(products.slice(i, i + this.itemsElementsCount));
    }
    return rows;
  }




}
