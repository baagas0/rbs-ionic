import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Update } from './update.page';
import { CustomComponentModule } from '../../../components/custom-component.module';

import { UpdateRoutingModule } from './update-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { InputSelectComponent } from 'src/app/components/input-select/input-select.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    ReactiveFormsModule,
    // IonicSelectableModule,
    // InputSelectComponent,
    UpdateRoutingModule,
  ],
  declarations: [Update],
})
export class UpdateModule {}
