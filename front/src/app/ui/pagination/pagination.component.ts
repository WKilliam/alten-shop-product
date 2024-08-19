import {Component, Input, OnInit} from '@angular/core';
import {StatAppService} from '../../services/stat.app/stat.app.service';
import {GENERAL} from '../../constant/GENERAL';

@Component({
  selector: 'app-ui-pagination',
  template: `
    <div class="pagination-container">
      <p class="information">
        Showing {{ currentPage }} to {{ elementPrintSize }} of {{ totalPages }} entries
      </p>
      <ul class="pagination-count">
        <li class="rollback-first" (click)="changePage(1)"><<</li>
        <li class="rollback-prev" (click)="changePage(currentPage - 1)" [class.disabled]="currentPage === 1"><</li>
        <li *ngIf="shouldShowStartEllipsis()" class="ellipsis">...</li>
        <li
          *ngFor="let page of enumationPageCount()"
          [class.active]="currentPage === page"
          (click)="changePage(page)">
          {{ page }}
        </li>
        <li *ngIf="shouldShowEndEllipsis()" class="ellipsis">...</li>
        <li class="rollback-next" (click)="changePage(currentPage + 1)" [class.disabled]="currentPage === totalPages">
          >
        </li>
        <li class="rollback-last" (click)="changePage(totalPages)">>></li>
      </ul>
      <select
        class="pagination-select-page"
        [(ngModel)]="elementPrintSize"
        (ngModelChange)="onElementPrintSizeChange($event)">
        <option *ngFor="let size of elementSizes" [ngValue]="size">
          {{ size }}
        </option>
      </select>
    </div>
  `,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  private GENERAL = new GENERAL();
  protected currentPage = this.GENERAL.getTabContentDefault().currentPage;
  protected elementPrintSize = this.GENERAL.getTabContentDefault().elementPrintSize;
  protected totalPages = this.GENERAL.getTabContentDefault().totalPages;
  protected elementPrintSizeMax = this.GENERAL.getTabContentDefault().elementPrintSizeMax;
  protected elementSizes = [10, 20, 30];

  constructor(private readonly statAppService: StatAppService) {
  }

  ngOnInit(): void {
    this.fetchStatApp();
  }

  fetchStatApp() {
    this.statAppService.getCurrentPage().subscribe((value: number) => {
      this.currentPage = value;
    });

    this.statAppService.getElementPrintSize().subscribe((value: number) => {
      this.elementPrintSize = value;
    });

    this.statAppService.getTotalPages().subscribe((value: number) => {
      this.totalPages = value;
    });

    this.statAppService.getElementPrintSizeMax().subscribe((value: number) => {
      if (value > 0) {
        if (this.elementPrintSizeMax !== value) {
          this.elementPrintSizeMax = value;
          this.elementSizes.push(this.elementPrintSizeMax);
        }
      }
    });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.statAppService.setCurrentPage(page);
    }
  }

  enumationPageCount(): number[] {
    const pages = [];
    if (this.totalPages <= 5) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(this.currentPage - 2, 1);
      const endPage = Math.min(startPage + 4, this.totalPages);
      if (endPage - startPage < 4) {
        startPage = Math.max(endPage - 4, 1);
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    return pages;
  }


  shouldShowStartEllipsis(): boolean {
    return this.totalPages > 5 && this.currentPage > 3;
  }

  shouldShowEndEllipsis(): boolean {
    return this.totalPages > 5 && this.currentPage + 2 < this.totalPages;
  }

  onElementPrintSizeChange(newSize: number) {
    this.statAppService.setCurrentPage(1);
    this.statAppService.setElementPrintSize(newSize);
  }
}
