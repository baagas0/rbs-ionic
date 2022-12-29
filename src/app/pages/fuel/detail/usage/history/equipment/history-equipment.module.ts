import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryEquipment } from './history-equipment.page';
import { CustomComponentModule } from '../../../../../../components/custom-component.module';

import { HistoryEquipmentRoutingModule } from './history-equipment-routing.module';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    HistoryEquipmentRoutingModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      doneLabel: 'SaveAJG',
      closeIcon: true,
    }),
  ],
  declarations: [HistoryEquipment],
})
export class HistoryEquipmentModule {}
