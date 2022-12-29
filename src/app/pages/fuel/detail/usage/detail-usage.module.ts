import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailFuelUsage } from './detail-usage.page';
import { CustomComponentModule } from '../../../../components/custom-component.module';

import { DetailFuelUsageRoutingModule } from './detail-usage-routing.module';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    DetailFuelUsageRoutingModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      doneLabel: 'Save',
      closeIcon: true,
    }),
  ],
  declarations: [DetailFuelUsage],
})
export class DetailFuelUsageModule {}
