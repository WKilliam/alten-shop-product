import { Component, Input, OnInit } from '@angular/core';
import { SidenavService } from './sidenav.service';
import { Router } from '@angular/router';
import { GENERAL } from '../../constant/GENERAL';

@Component({
  selector: 'app-ui-sidenav',
  template: `
    <div class="sidenav" [class.expanded]="sidenavService.getExpanded()"
         (mouseover)="sidenavService.setExpanded(true)"
         (mouseleave)="sidenavService.setExpanded(false)">
      <i class="pi pi-bookmark pinned-icon"
         *ngIf="!sidenavService.getMobileDisplay()"
         [class.active]="sidenavService.getPinned()"
         (click)="sidenavService.togglePinned()"
         data-expanded-only>
      </i>
      <div class="title-container" [routerLink]="'/'">
        <img src="favicon.ico" height="25" alt="">
        <div class="title" data-expanded-only>
          <span class="first">{{ general.getText('SIDENAV_TITLE') }}</span>
        </div>
      </div>
      <ul>
        <li *ngFor="let item of sidenavItems" [class.router-link-active]="rla.isActive">
          <div class="li-container"
               (click)="onSidenavItemClick(item, $event)"
               [routerLink]="item.link"
               [routerLinkActiveOptions]="{ exact: item.link === '/' }"
               routerLinkActive
               #rla="routerLinkActive">
            <i class="pi pi-{{item.icon}} menu-icon"></i>
            <span class="menu-title" data-expanded-only>{{ item.label[lang] }}</span>
          </div>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() public lang = 'en';
  @Input() general: GENERAL;
  public sidenavItems: Array<{ label: { [key: string]: string }, link: string, icon: string }> = [];

  constructor(private readonly router: Router,
              public readonly sidenavService: SidenavService) { }

  ngOnInit(): void {
    this.loadSidenavItems();
  }

  private loadSidenavItems(): void {
    const items = this.general.getObject('SIDENAV_ITEMS');
    if (items) {
      this.sidenavItems = items.map(item => ({
        label: item.label,
        link: item.link,
        icon: item.icon
      }));
    }
  }

  public onSidenavItemClick(item: { label: { [key: string]: string }, link: string, icon: string }, event: Event): void {
    event.preventDefault();
    this.navigate(item);

    if (this.sidenavService.getMobileDisplay()) {
      this.sidenavService.setExpanded(false);
    }
  }

  private navigate(item: { label: { [key: string]: string }, link: string, icon: string }): void {
    this.router.navigate([item.link]);
  }
}
