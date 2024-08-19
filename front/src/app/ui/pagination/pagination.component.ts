import {Component, Input, OnInit} from '@angular/core';
import {StatAppService} from '../../services/stat.app/stat.app.service';
import {GENERAL} from '../../constant/GENERAL';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  withLatestFrom
} from 'rxjs';

@Component({
  selector: 'app-ui-pagination',
  template: `
    <div class="pagination-container">
      <p class="information">
        Showing {{ printUiRealCurrentPage }} to {{ elementPrintSize }} of {{ elementPrintSizeMax }} entries
      </p>
      <ul class="pagination-count">
        <li class="rollback-first" (click)="selectFirstOrLastPage(true)">
          <<
        </li>
        <li class="rollback-prev"
            (click)="selectAfterOrbeforeOneValuePage(true)"
            [class.disabled]="currentPageOnList == 1">
          <
        </li>
        <li *ngIf="shouldShowStartAndEndEllipsis(true)" class="ellipsis">...</li>
        <li *ngFor="let page of totalPagesArray"
            [class.active]="currentPageOnList === page"
            (click)="selectPage(page)">
          {{ page }}
        </li>
        <li *ngIf="shouldShowStartAndEndEllipsis(false)" class="ellipsis">...</li>
        <li class="rollback-next" (click)="selectAfterOrbeforeOneValuePage(false)"
            [class.disabled]="currentPageOnList === totalPages">
          >
        </li>
        <li class="rollback-last" (click)="selectFirstOrLastPage(false)">
          >>
        </li>
      </ul>
      <select class="pagination-select-page"
              [(ngModel)]="elementPrintSize"
              (ngModelChange)="onElementPrintSizeChange($event)">
        <option
          *ngFor="let size of elementSizes"
          [ngValue]="size"
        >
          {{ size }}
        </option>
      </select>
    </div>
  `,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  protected currentPageOnList: number;
  protected printUiRealCurrentPage: number;
  protected elementPrintSize: number;
  protected totalPages: number;
  protected elementPrintSizeMax: number;
  protected elementSizes = [];
  protected totalPagesArray: number[] = [];

  constructor(private readonly statAppService: StatAppService) { }

  ngOnInit(): void {
    this.fetchStatAppService();
  }

  fetchStatAppService(): void {
    combineLatest([
      this.statAppService.getCurrentPage(),
      this.statAppService.getElementPrintSize(),
      this.statAppService.getElementPrintSizeMax(),
      this.statAppService.getTotalPages()
    ]).pipe(
      distinctUntilChanged(),
      filter(([currentPage, elementPrintSize, elementPrintSizeMax, totalPages]) => elementPrintSizeMax > 0)
    ).subscribe(([currentPage, elementPrintSize, elementPrintSizeMax, totalPages]) => {
      this.elementPrintSizeMax = elementPrintSizeMax;
      this.elementPrintSize = elementPrintSize;
      this.currentPageOnList = currentPage + 1;  // Ajuster pour l'affichage (1-indexé)
      this.totalPages = totalPages;
      this.printUiRealCurrentPage = this.currentPageOnList;
      this.totalPagesArray = this.generateVisiblePages();
      this.elementSizes = this.generateDividedValues(this.elementPrintSizeMax);
    });
  }

  selectPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPageOnList = page;
      this.statAppService.setCurrentPage(page - 1);  // Stocker en 0-indexé
      this.printUiRealCurrentPage = this.currentPageOnList;
      this.totalPagesArray = this.generateVisiblePages();
    }
  }

  shouldShowStartAndEndEllipsis(isStart: boolean): boolean {
    if (isStart) {
      return this.currentPageOnList > 3;
    } else {
      return this.currentPageOnList < this.totalPages - 2;
    }
  }

  onElementPrintSizeChange(newSize: number) {
    this.statAppService.setElementPrintSize(newSize);
    this.currentPageOnList = 1; // Réinitialiser à la première page
    this.statAppService.setCurrentPage(0);
    this.totalPagesArray = this.generateVisiblePages();
  }

  selectFirstOrLastPage(first: boolean) {
    if (first) {
      this.selectPage(1);
    } else {
      this.selectPage(this.totalPages);
    }
  }

  selectAfterOrbeforeOneValuePage(before: boolean) {
    if (before) {
      if (this.currentPageOnList > 1) {
        this.selectPage(this.currentPageOnList - 1);
      }
    } else {
      if (this.currentPageOnList < this.totalPages) {
        this.selectPage(this.currentPageOnList + 1);
      }
    }
  }

  generateDividedValues(value: number): number[] {
    const increment = Math.pow(10, Math.max(value.toString().length - 1, 1));
    return Array.from({ length: Math.ceil(value / increment) }, (_, i) => (i + 1) * increment).map(v => Math.min(v, value));
  }

  generateVisiblePages(): number[] {
    const pages: number[] = [];

    let startPage = Math.max(this.currentPageOnList - 2, 1);
    let endPage = Math.min(this.currentPageOnList + 2, this.totalPages);

    if (this.currentPageOnList <= 3) {
      startPage = 1;
      endPage = Math.min(5, this.totalPages);
    } else if (this.currentPageOnList >= this.totalPages - 2) {
      startPage = Math.max(this.totalPages - 4, 1);
      endPage = this.totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

}
