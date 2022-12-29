import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HistoryEquipment } from './equipment/history-equipment.page';

const routes: Routes = [
  {
    path: 'equipment',
    // component: HistoryEquipment,
    loadChildren: () =>
          import('./equipment/history-equipment.module').then((m) => m.HistoryEquipmentModule),
  },
  {
    path: 'driver',
    // component: HistoryEquipment,
    loadChildren: () =>
          import('./driver/history-driver.module').then((m) => m.HistoryDriverModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class HistoryRoutingModule {}
