import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormFuelIncome } from './form-income.page';

const routes: Routes = [
  {
    path: '',
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
export class FormFuelIncomeRoutingModule {}
