import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Production } from './production.page';
import { CustomComponentModule } from '../../components/custom-component.module';

import { ProductionRoutingModule } from './production-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    ProductionRoutingModule,
  ],
  declarations: [Production],
})
export class ProductionModule {}
