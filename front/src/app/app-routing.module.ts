import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {routes} from './router.config';


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})

export class AppRoutingModule {}
