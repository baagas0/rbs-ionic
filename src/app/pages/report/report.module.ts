import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Report } from './report.page';
import { CustomComponentModule } from '../../components/custom-component.module';

import { ReportRoutingModule } from './report-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    CustomComponentModule,
    NgApexchartsModule,
    ReportRoutingModule,
  ],
  declarations: [Report],
})
export class ReportModule {}
