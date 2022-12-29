import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DetailFuelIncome } from './detail-income.page';

const routes: Routes = [
  {
    path: '',
    component: DetailFuelIncome,
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
export class DetailFuelIncomeRoutingModule {}
