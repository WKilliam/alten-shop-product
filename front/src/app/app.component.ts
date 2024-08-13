import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from './ui/sidenav/sidenav.service';
import {GENERAL} from './constant/GENERAL';
import {MainContentService} from './ui/main.content/main.content.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <div class="app-container"
           [class.sidenav-expanded]="getExpanded"
           [class.sidenav-pinned]="getPinned">
        <app-ui-sidenav [general]="_general"></app-ui-sidenav>
        <app-ui-main-content [general]="_general" ></app-ui-main-content>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @HostBinding('class.transparent') transparent = false;
  _general: GENERAL = new GENERAL();

  constructor(
    private readonly router: Router,
    private readonly sidenavService: SidenavService,
    private readonly mainContentService: MainContentService
  ) {}

  get getExpanded(): boolean {
    return this.sidenavService.getExpanded();
  }

  get getPinned(): boolean {
    return this.sidenavService.getPinned();
  }

  ngOnInit() {
    this.mainContentService.setCurrentPageName('Home');
  }
}
