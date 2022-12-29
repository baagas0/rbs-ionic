import { IonicModule } from '@ionic/angular';
import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailResourcesDriver } from './detail-driver.page';
import { CustomComponentModule } from '../../../../components/custom-component.module';

import { DetailResourcesDriverRoutingModule } from './detail-driver-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    DetailResourcesDriverRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [DetailResourcesDriver, Pipe],
})
export class DetailResourcesDriverModule {}
