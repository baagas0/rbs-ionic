import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormFuelIncome } from './income/form-income.page';
import { FormFuelUsage } from './usage/form-usage.page';

const routes: Routes = [
  {
    path: 'usage',
    component: FormFuelUsage,
  },
  {
    path: 'income',
    component: FormFuelIncome,
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
export class FormFuelUsageRoutingModule {}
