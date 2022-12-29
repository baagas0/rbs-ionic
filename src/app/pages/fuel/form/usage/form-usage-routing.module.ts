import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormFuelUsage } from './form-usage.page';

const routes: Routes = [
  {
    path: '',
    component: FormFuelUsage,
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
