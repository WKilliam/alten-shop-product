import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-ui-breadcrumb',
  template: `
    <nav class="breadcrumb-container">
      <ng-container *ngFor="let item of items; let last = last">
    <span *ngIf="!last">
      <a [routerLink]="item.routerLink" class="breadcrumb-item">{{ item.label }}</a>
      <span class="breadcrumb-separator">></span>
    </span>
        <span *ngIf="last" class="breadcrumb-item last">{{ item.label }}</span>
      </ng-container>
    </nav>
  `,
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  public items: MenuItem[] = [];
  private homeItem: MenuItem = { label: 'Home', routerLink: '/' };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.items = [this.homeItem];
        this.buildBreadcrumb(this.router.url);
      });
  }

  private buildBreadcrumb(path: string): void {
    const segments = path.split('/').filter(segment => segment);
    let url = '';
    segments.forEach(segment => {
      url += `/${segment}`;
      this.items.push({ label: segment, routerLink: url });
    });
  }
}
