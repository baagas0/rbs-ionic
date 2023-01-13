import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileUser } from './profile-user.page';
import { CustomComponentModule } from '../../components/custom-component.module';

import { ProfileUserRoutingModule } from './profile-user-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { InputSelectComponent } from 'src/app/components/input-select/input-select.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    ProfileUserRoutingModule,
  ],
  declarations: [ProfileUser],
})
export class ProfileUserModule {}
