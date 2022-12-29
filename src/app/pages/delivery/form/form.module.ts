import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Form } from './form.page';
import { CustomComponentModule } from '../../../components/custom-component.module';

import { FormRoutingModule } from './form-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { InputSelectComponent } from 'src/app/components/input-select/input-select.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    FormRoutingModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    InputSelectComponent,
  ],
  declarations: [Form],
})
export class FormModule {}
