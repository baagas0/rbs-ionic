import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Fuel } from './fuel.page';
import { CustomComponentModule } from '../../components/custom-component.module';

import { FuelRoutingModule } from './fuel-routing.module';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    FuelRoutingModule,
    CalendarModule.forRoot({
      doneLabel: 'Save',
      closeIcon: true,
    }),
  ],
  declarations: [Fuel],
})
export class FuelModule {}
