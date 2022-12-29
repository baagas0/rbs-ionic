import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dashboard } from './dashboard.page';
import { CustomComponentModule } from '../../components/custom-component.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CalendarModule } from 'ion2-calendar';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    DashboardRoutingModule,
    NgApexchartsModule,
    CalendarModule.forRoot({
      doneLabel: 'Save',
      closeIcon: true,
    }),
  ],
  declarations: [Dashboard],
})
export class DashboardModule {}
