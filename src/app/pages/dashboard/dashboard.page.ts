import { DatePipe, Location } from '@angular/common';
import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CalendarComponentOptions } from 'ion2-calendar';
import * as moment from 'moment';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexResponsive,
  ApexStroke,
  ApexTheme,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent,
} from 'ng-apexcharts';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  colors: any;
  fill: ApexFill;
  legend: ApexLegend;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};

export type ColumnChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  theme: ApexTheme;
  grid: ApexGrid;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class Dashboard {
  profile: any = {}; // Data profile dari auth

  dataUp: any = []; // Data Unit Produksi
  upSelected: string = ''; // Unit Produksi yang di pilih

  private sub_production_unit_id: Subscription;
  private sub_date: Subscription;

  public formData: FormGroup;
  showDatePicker: boolean = false;
  valDate: any = {
    from: '',
    to: '',
  };
  valDateOptions: CalendarComponentOptions = {
    pickMode: 'range',
    from: new Date(2021, 0, 1), // days click enabled from;
    to: new Date(2024, 8, 15), // days click enabled to;
  };

  dataStatistic: any = {}; // Data Statictic
  dataIndexEquipment: any = []; // Data Index Equipment
  dataAverageIndex: any = [];
  dataTotalDelivery: any = [];

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private location: Location,
    public restService: RestService,
    private auth: AuthService,
    private datePipe: DatePipe,
    private storage: StorageService
  ) {
    this.formData = new FormGroup({
      // valDate: new FormControl(),
      searchDocket: new FormControl(),
      production_unit_id: new FormControl(),
      production_unit_id_array: new FormControl(),
      date: new FormControl(),
    });

    this.valDate = {
      from: new Date('12/01/2022'),
      to: new Date('12/31/2022'),
    };
  }

  // async ngOnInit() {
  async ionViewDidEnter() {
    this.profile = await this.auth.getProfile();
    console.log('profile')
    console.log(this.profile)

    this.sub_production_unit_id = this.formData.controls[
      'production_unit_id'
    ].valueChanges.subscribe((value) => {
      this.getStatistic();
      this.getIndexEquipment();
      this.getAverageIndex();
      this.getTotalDelivery();
    });

    this.sub_date = this.formData.controls['date'].valueChanges.subscribe(
      (value) => {
        console.log('date change');
        // this.ngOnInit();
        // this.ionViewDidEnter();
        this.getStatistic();
        this.getIndexEquipment();
        this.getAverageIndex();
        this.getTotalDelivery();
      }
    );

    this.getStatistic();
    this.getIndexEquipment();
    this.getAverageIndex();
    this.getTotalDelivery();
  }

  // ionViewDidEnter() {}

  getUP() {
    let uri = `lookup/production-units`;
    let params = {
      'production_date[]': this.getDate(),
    };
    this.restService.getting(uri, params).then((res) => {
      this.dataUp = res.data.data;
    });
  }

  getStatistic() {
    let uri = 'dashboard/monitoring/statistic/data';
    let params = {
      'date[]': this.getDate(),
    };
    this.restService.getting(uri, params).then((res) => {
      this.dataStatistic = res.data;
    });
  }

  getAverageIndex() {
    let uri = 'mobile/dashboard/average-index';
    let params = {
      'date[]': this.getDate(),
    };
    this.restService.getting(uri, params).then((res) => {
      this.dataAverageIndex = res.data;
    });
  }

  getTotalDelivery() {
    let uri = 'mobile/dashboard/total-delivery';
    let params = {
      'date[]': this.getDate(),
    };
    this.restService.getting(uri, params).then((res) => {
      this.dataTotalDelivery = res.data;
    });
  }

  getIndexEquipment() {
    let uri = 'dashboard/monitoring/equipment-report/liter-m3-fuel';
    let params = {
      // date: this.getDate()[0],
      date: moment().format('YYYY-MM-DD'),
    };
    console.log(params);
    this.restService.getting(uri, params).then((res) => {
      this.dataIndexEquipment = res.data;
      console.log(res);
    });
  }

  getDate() {
    // let date = await this.storage.get('date');

    return [
      this.datePipe.transform(this.valDate.from, 'yyyy-MM-dd'),
      this.datePipe.transform(this.valDate.to, 'yyyy-MM-dd'),
    ];
  }

  go(to) {
    this.location.go(to);
  }

  ionViewDidLeave() {
    console.log('Leave Page');
    this.sub_production_unit_id.unsubscribe();
    this.sub_date.unsubscribe();
  }

  statusColor(status_code) {
    switch (status_code) {
      case 'PENDING':
        return 'danger';
        break;
      case 'PROGRESS':
        return 'warning';
        break;
      case 'SUCCESS':
        return 'success';
        break;

      default:
        return 'warning';
        break;
    }
  }
}
