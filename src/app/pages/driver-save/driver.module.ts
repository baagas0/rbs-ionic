import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Driver } from './driver.page';
import { CustomComponentModule } from '../../components/custom-component.module';

import { DriverRoutingModule } from './driver-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    DriverRoutingModule,
  ],
  declarations: [Driver],
})
export class DriverModule {}
