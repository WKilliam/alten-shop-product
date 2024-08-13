import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HttpService } from '../../core/http/http';
import { ProductModels } from '../../models/product/product.models';
import { ResponseModel } from '../../models/response/response';
import {FilterService} from '../../services/filter/filter.service';

@Component({
  selector: 'app-ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges {

  @Input() page = 0;
  @Input() link = '';
  @Input() displayMode = false;
  private itemsElementsCount =  5;
  products: ProductModels[] = [];

  constructor(private readonly http: HttpService, private readonly filterService: FilterService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.page || changes.link) {
      this.fetchProducts();
    }
  }

  private fetchProducts(): void {
    const instanceItems = this.displayMode ? 20 : 40;
    this.http.getProducts(this.page, instanceItems).subscribe((data: ResponseModel) => {
      this.products = data.data;
    });
  }

  getRows(products: ProductModels[]): ProductModels[][] {
    const rows: ProductModels[][] = [];
    for (let i = 0; i < products.length; i += this.itemsElementsCount) {
      rows.push(products.slice(i, i + this.itemsElementsCount));
    }
    return rows;
  }
}
