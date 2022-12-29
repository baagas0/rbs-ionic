import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormFuelIncome } from './income/form-income.page';
import { FormFuelUsage } from './usage/form-usage.page';

const routes: Routes = [
  {
    path: 'usage',
    // component: FormFuelUsage,
    loadChildren: () =>
          import('./usage/form-usage.module').then((m) => m.FormFuelUsageModule),
  },
  {
    path: 'income',
    loadChildren: () =>
          import('./income/form-income.module').then((m) => m.FormFuelIncomeModule),
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
