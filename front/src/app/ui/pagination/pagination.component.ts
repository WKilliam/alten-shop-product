import {Component, Input, OnInit} from '@angular/core';
import {DataManagerService} from "../../services/data.manager/data.manager.service";

@Component({
  selector: 'app-ui-pagination',
  template: `
    <div class="pagination-container">
      <p class="information">
        Showing {{ currentPage }} to {{ pageSize }} of {{ totalPages }} entries
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
        <li class="rollback-next" (click)="changePage(currentPage + 1)" [class.disabled]="currentPage === totalPages">></li>
        <li class="rollback-last" (click)="changePage(totalPages)">>></li>
      </ul>
      <select class="pagination-select-page">
        <option value="10">10</option>
      </select>
    </div>
  `,
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit{

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  constructor(private readonly dataManager: DataManagerService) {
  }

  ngOnInit(): void {
    this.dataManager.getCurrentPage().subscribe((value) => {
      this.currentPage = value;
    });
    this.dataManager.getTotalPages().subscribe((value) => {
      this.pageSize = value;
    });
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

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }


}
