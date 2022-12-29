import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormFuelUsage } from './form-usage.page';
import { CustomComponentModule } from '../../../../components/custom-component.module';

import { FormFuelUsageRoutingModule } from './form-usage-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    FormFuelUsageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FormFuelUsage],
})
export class FormFuelUsageModule {}
