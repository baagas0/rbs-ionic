import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Delivery } from './delivery.page';
import { CustomComponentModule } from '../../components/custom-component.module';

import { DeliveryRoutingModule } from './delivery-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    DeliveryRoutingModule,
  ],
  declarations: [Delivery],
})
export class DeliveryModule {}
