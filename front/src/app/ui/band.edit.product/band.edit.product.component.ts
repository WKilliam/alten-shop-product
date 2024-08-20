import {Component, OnInit} from '@angular/core';
import { StatAppService } from 'app/services/stat.app/stat.app.service';

@Component({
  selector: 'app-ui-band-edit-product',
  template: `
    <div class="toolbar">
      <div class="left-admin-content">
        <button class="btn btn--edit">Edit</button>
        <button class="btn btn--delete" [disabled]="true">Delete</button>
      </div>
      <div class="right-admin-content">
        <button class="btn btn--config">
          <i class="pi pi-cog"></i>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./band.edit.product.component.scss']
})
export class BandEditProductComponent implements OnInit {

  constructor(private readonly statAppService: StatAppService) {
  }

  ngOnInit(): void {
  }

}
