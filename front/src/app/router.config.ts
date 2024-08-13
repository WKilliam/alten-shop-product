import {Routes} from '@angular/router';
import {ProductComponent} from './features/product/product.component';
import {ProductAdminComponent} from './features/product.admin/product.admin.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductComponent,
    data: { breadcrumb: 'Products' }
  },
  {
    path: 'admin/products',
    component: ProductAdminComponent,
    data: { breadcrumb: 'Admin Products' }
  },
];
