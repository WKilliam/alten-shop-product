import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'app/app-routing.module';
import { AppComponent } from 'app/app.component';
import { BaseModule } from 'app/base/base.module';
import { SharedModule } from 'app/shared/shared.module';
import { ProductComponent } from './features/product/product.component';
import { ProductAdminComponent } from './features/product.admin/product.admin.component';
import { SidenavComponent } from './ui/sidenav/sidenav.component';
import { MainContentComponent } from './ui/main.content/main.content.component';
import { BreadcrumbComponent } from './ui/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [AppComponent, ProductComponent, ProductAdminComponent, SidenavComponent, MainContentComponent, BreadcrumbComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    BaseModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEn, 'en');
  }
}
