import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HistoryEquipment } from './history-equipment.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryEquipment,
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
export class HistoryEquipmentRoutingModule {}
