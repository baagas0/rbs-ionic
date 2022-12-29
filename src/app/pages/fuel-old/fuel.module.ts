import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormPageRoutingModule } from './form-routing.module';

import { FormPage } from './form/form.page';
import { CustomComponentModule } from 'src/app/components/custom-component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormPageRoutingModule,
    CustomComponentModule,
  ],
  declarations: [FormPage],
})
export class FuelPageModule {}
