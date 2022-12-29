import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Resources } from './resources.page';
import { CustomComponentModule } from '../../components/custom-component.module';

import { ResourcesRoutingModule } from './resources-routing.module';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    ResourcesRoutingModule,
    CalendarModule.forRoot({
      doneLabel: 'Save',
      closeIcon: true,
    }),
  ],
  declarations: [Resources],
})
export class ResourcesModule {}
