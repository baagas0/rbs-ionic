import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryDriver } from './history-driver.page';
import { CustomComponentModule } from '../../../../../../components/custom-component.module';

import { HistoryDriverRoutingModule } from './history-driver-routing.module';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    HistoryDriverRoutingModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      doneLabel: 'SaveAJG',
      closeIcon: true,
    }),
  ],
  declarations: [HistoryDriver],
})
export class HistoryDriverModule {}
