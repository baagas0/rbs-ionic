import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fuel } from './fuel.page';
// import { Form } from './form/form.page';

const routes: Routes = [
  {
    path: '',
    component: Fuel,
  },
  {
    path: 'form',
    loadChildren: () =>
          import('./form/form-routing.module').then((m) => m.FormFuelUsageRoutingModule),
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
export class FuelRoutingModule {}
