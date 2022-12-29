import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFuelIncome } from './form-income.page';
import { CustomComponentModule } from '../../../../components/custom-component.module';

import { FormFuelIncomeRoutingModule } from './form-income-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    FormFuelIncomeRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormFuelIncome],
})
export class FormFuelIncomeModule {}
