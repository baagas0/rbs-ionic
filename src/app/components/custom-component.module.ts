import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container/explore-container.component';
import { InputFileComponent } from './input-file/input-file.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    ReactiveFormsModule
  ],
  declarations: [
    ExploreContainerComponent,
    InputFileComponent,
    TopHeaderComponent,
    InputSelectComponent,
  ],
  exports: [
    ExploreContainerComponent,
    InputFileComponent,
    TopHeaderComponent,
    InputSelectComponent,
  ],
})
export class CustomComponentModule {}
