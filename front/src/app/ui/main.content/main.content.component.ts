import {Component, Input, OnInit} from '@angular/core';
import {SidenavService} from '../sidenav/sidenav.service';
import {GENERAL} from '../../constant/GENERAL';

@Component({
  selector: 'app-ui-main-content',
  template: `
    <div [class.expanded]="sidenavService.getExpanded()" class="main-content">
      <!-- NavBarComponent -->
      <app-ui-navbar class="navbar-content"></app-ui-navbar>
      <!-- BreadcrumbComponent -->
      <app-ui-breadcrumb class="breadcrumb-content"></app-ui-breadcrumb>
      <!-- ContentComponent -->
      <div class="page-content" >
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./main.content.component.scss']
})
export class MainContentComponent implements OnInit {

  @Input() general: GENERAL;

  constructor(
    public sidenavService: SidenavService
  ) {
  }

  ngOnInit(): void {
  }
}
