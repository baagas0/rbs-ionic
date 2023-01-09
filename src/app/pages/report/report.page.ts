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
import * as moment from 'moment';

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
  period: string = '7_hari';
  period_date: any = [];

  @ViewChild('chartProgressMonth', { static: true }) chart: ChartComponent;
  chartOptions: Partial<ChartOptions>; // Data chart progress month
  dataFuelIndex: any = {};

  dataIndexEquipment: any = []; // Data Index Equipment

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService
  ) {}

  async ngOnInit() {
    this.getIndexEquipment();
  }

  ionViewDidEnter() {
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
          name: 'minimum',
          color: colorSet[0],
          data: [],
        },
        {
          name: 'average',
          color: colorSet[1],
          data: [],
        },
        {
          name: 'maximum',
          color: colorSet[2],
          data: [],
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
        categories: [],
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
      },
    };

    this.selectPeriod('7_hari');
  }

  selectTab(tab) {
    console.log(tab);
    this.tab = tab;

    this.initChart();
  }

  selectPeriod(period) {
    this.period = period;

    let dateTo = moment().format('YYYY-MM-DD');
    let dateFrom = '';
    if (this.period == '7_hari') {
      dateFrom = moment().subtract(7, 'd').format('YYYY-MM-DD');
    } else if (this.period == '1_bulan') {
      dateFrom = moment().subtract(1, 'months').format('YYYY-MM-DD');
    } else if (this.period == '3_bulan') {
      dateFrom = moment().subtract(3, 'months').format('YYYY-MM-DD');
    } else if (this.period == '6_bulan') {
      dateFrom = moment().subtract(6, 'months').format('YYYY-MM-DD');
    } else {
      dateFrom = moment().format('YYYY-MM-DD');
    }
    console.log(dateFrom);

    this.period_date = [dateFrom, dateTo];

    this.initChart();
  }

  getIndexEquipment() {
    let uri = 'dashboard/monitoring/equipment-report/liter-m3-fuel';
    let params = {
      date: moment().format('YYYY-MM-DD'),
    };
    this.restService.getting(uri, params).then((res) => {
      this.dataIndexEquipment = res.data;
      console.log(res.data.data[0]);
    });
  }

  initChart() {
    let uri = '';

    let params = {
      'custom_date[]': this.period_date,
    };

    let colorSet = [];
    if (this.tab == 'l/m3') {
      colorSet = ['#82AAE3', '#C0DEFF', '#82C3EC'];
      uri = 'dashboard/monitoring/liter-m3-fuel';
    } else if (this.tab == 'km/l') {
      colorSet = ['#ADE792', '#6ECCAF', '#86C8BC'];
      uri = 'dashboard/monitoring/km-liter-fuel';
    } else {
      colorSet = ['#E5BA73', '#FFDCA9', '#C58940'];
      uri = 'dashboard/monitoring/m3-rit-fuel';
    }

    this.restService.getting(uri, params).then((res) => {
      // console.log(res);
      this.dataFuelIndex = res.data.summary;

      let categories = [];
      let series = [
        {
          name: 'Minimum Index',
          color: colorSet[0],
          data: [],
        },
        {
          name: 'Average Index',
          color: colorSet[1],
          data: [],
        },
        {
          name: 'Maximum Index',
          color: colorSet[2],
          data: [],
        },
      ];
      for (let i = 0; i < res.data.data.length; i++) {
        let data = res.data.data[i];
        let date = moment(data.date, 'YYYY-MM-DD').locale('id').format('D MMM YYYY');

        categories.push(date);
        series[0].data.push(data.min || 0);
        series[1].data.push(data.average || 0);
        series[2].data.push(data.max || 0);
      }

      this.chart.updateSeries(series);
      this.chart.updateOptions({
        chart: {
          // width: '100%',
          width: res.data.data.length * 75,
        },
        xaxis: {
          categories: categories,
        },
      });
    });
  }
}
