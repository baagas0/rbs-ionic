import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonTabs } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-report',
  templateUrl: 'report.page.html',
  styleUrls: ['report.page.scss'],
})
export class Report {
  tab: string = 'l/m3';
  chartOptions: Partial<ChartOptions>; // Data chart progress month
  dataIndexEquipment: any = []; // Data Index Equipment

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService
  ) {}

  async ngOnInit() {}

  ionViewDidEnter() {
    this.chartProgressMonth();
  }

  selectTab(tab) {
    console.log(tab);
    this.tab = tab;

    this.chartProgressMonth();
  }

  getIndexEquipment() {
    let uri = 'dashboard/monitoring/equipment-report/liter-m3-fuel';
    let params = {
      date: '2022-12-21',
    };
    this.restService.getting(uri, params).then((res) => {
      this.dataIndexEquipment = res.data;
      console.log(res);
    });
  }

  chartProgressMonth() {
    let colorSet = [];
    if (this.tab == 'l/m3') {
      colorSet = ['#82AAE3', '#C0DEFF', '#82C3EC'];
    } else if (this.tab == 'km/l') {
      colorSet = ['#ADE792', '#6ECCAF', '#86C8BC'];
    } else {
      colorSet = ['#E5BA73', '#FFDCA9', '#C58940'];
    }

    this.chartOptions = {
      series: [
        {
          name: 'series1',
          color: colorSet[0],
          data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
          name: 'series2',
          color: colorSet[1],
          data: [11, 32, 45, 32, 34, 52, 41],
        },
        {
          name: 'series2',
          color: colorSet[2],
          data: [26, 34, 65, 12, 74, 22, 61],
        },
      ],
      chart: {
        // width: '100%',
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'numeric',
        categories: [1, 2, 3, 4, 5, 6, 7],
      },
      tooltip: {
        x: {
          // format: "dd/MM/yy HH:mm"
        },
      },
    };
  }
}
