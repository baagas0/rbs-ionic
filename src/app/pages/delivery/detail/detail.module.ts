import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Detail } from './detail.page';
import { CustomComponentModule } from '../../../components/custom-component.module';

import { DetailRoutingModule } from './detail-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    DetailRoutingModule,
  ],
  declarations: [Detail],
})
export class DetailModule {}
