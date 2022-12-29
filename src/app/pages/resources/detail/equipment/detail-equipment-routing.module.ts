import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DetailFuelUsage } from './detail-equipment.page';

const routes: Routes = [
  {
    path: '',
    component: DetailFuelUsage,
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
export class DetailFuelUsageRoutingModule {}
