import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Production } from './production.page';

const routes: Routes = [
  {
    path: '',
    component: Production,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductionRoutingModule {}
