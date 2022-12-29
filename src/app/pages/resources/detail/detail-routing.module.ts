import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DetailResourcesDriver } from './driver/detail-driver.page';
import { DetailFuelUsage } from './equipment/detail-equipment.page';

const routes: Routes = [
  {
    path: 'equipment',
    // component: DetailFuelUsage,
    loadChildren: () =>
      import('./equipment/detail-equipment-routing.module').then(
        (m) => m.DetailFuelUsageRoutingModule
      ),
  },
  {
    path: 'driver',
    // component: DetailResourcesDriver,
    loadChildren: () =>
      import('./driver/detail-driver-routing.module').then(
        (m) => m.DetailResourcesDriverRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class DetailRoutingModule {}
