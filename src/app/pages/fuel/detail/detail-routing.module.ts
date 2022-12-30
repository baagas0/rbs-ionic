import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DetailFuelIncome } from './income/detail-income.page';
import { DetailFuelUsage } from './usage/detail-usage.page';

const routes: Routes = [
  {
    path: 'usage',
    // component: DetailFuelUsage,
    loadChildren: () =>
      import('./usage/detail-usage.module').then(
        (m) => m.DetailFuelUsageModule
      ),
  },
  {
    path: 'income',
    loadChildren: () =>
      import('./income/detail-income.module').then(
        (m) => m.DetailFuelIncomeModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class DetailRoutingModule {}
