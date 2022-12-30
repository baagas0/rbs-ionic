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
      import('./equipment/detail-equipment.module').then(
        (m) => m.DetailFuelUsageModule
      ),
  },
  {
    path: 'driver',
    // component: DetailResourcesDriver,
    loadChildren: () =>
      import('./driver/detail-driver.module').then(
        (m) => m.DetailResourcesDriverModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class DetailRoutingModule {}
