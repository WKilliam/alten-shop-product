import {Component, OnInit} from '@angular/core';
import {ProductModels} from '../../models/product/product.models';
import {DataManagerService} from '../../services/data.manager/data.manager.service';
import {StatAppService} from '../../services/stat.app/stat.app.service';
import {GENERAL} from '../../constant/GENERAL';

@Component({
  selector: 'app-ui-table',
  template: `
    <div class="table-container">
      <div class="table-scrollable" *ngIf="displayMode === true">
        <table>
          <tr *ngFor="let row of getRows(products)">
            <td *ngFor="let product of row">
              <app-ui-card-product [product]="product"></app-ui-card-product>
            </td>
          </tr>
        </table>
      </div>
      <ng-container *ngIf="displayMode === false">
        <div class="table-band">
          <app-ui-band-product *ngFor="let product of products" [products]="product"></app-ui-band-product>
        </div>
      </ng-container>
    </div>
  `,
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayMode = true;
  products: ProductModels[] = [];
  private GENERAL = new GENERAL();

  constructor(
    private readonly dataManager: DataManagerService,
    private readonly statAppService: StatAppService
  ) {
  }

  ngOnInit(): void {

    this.dataManager.getData().subscribe(response => {
      this.products = response;
    });

    this.dataManager.getData().subscribe(value => {
      this.products = value;
    });

    this.statAppService.getViewMode().subscribe(mode => {
      this.displayMode = mode;
    });
  }

  getRows(products: ProductModels[]): ProductModels[][] {
    const rows: ProductModels[][] = [];
    for (let i = 0; i < products.length; i += this.GENERAL.getTabContentDefault().itemOnRow) {
      rows.push(products.slice(i, i + this.GENERAL.getTabContentDefault().itemOnRow));
    }
    return rows;
  }
}
