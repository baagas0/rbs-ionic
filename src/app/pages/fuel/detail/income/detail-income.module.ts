import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailFuelIncome } from './detail-income.page';
import { CustomComponentModule } from '../../../../components/custom-component.module';

import { DetailFuelIncomeRoutingModule } from './detail-income-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    DetailFuelIncomeRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetailFuelIncome],
})
export class DetailFuelIncomeModule {}
