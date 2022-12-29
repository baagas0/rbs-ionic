import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Delivery } from './delivery.page';
// import { Form } from './form/form.page';

const routes: Routes = [
  {
    path: '',
    component: Delivery,
  },
  {
    path: 'form',
    loadChildren: () =>
          import('./form/form-routing.module').then((m) => m.FormRoutingModule),
  },
  {
    path: 'detail',
    loadChildren: () =>
          import('./detail/detail-routing.module').then((m) => m.DetailRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeliveryRoutingModule {}
