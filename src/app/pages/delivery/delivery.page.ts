import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonContent, NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-delivery',
  templateUrl: 'delivery.page.html',
  styleUrls: ['delivery.page.scss'],
})
export class Delivery {
  @ViewChild(IonContent, { read: IonContent }) myContent: IonContent;

  public formData: FormGroup;
  showDatePicker: boolean = false;

  data: any = [];

  dataLimit: any = 15;
  currentPage: any = 0;
  countData: any = 1;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private navCtrl: NavController
  ) {}

  // async ngOnInit() {
  async ionViewDidEnter() {
    this.formData = new FormGroup({
      valDate: new FormControl(),
    });

    this.formData.controls['valDate'].setValue(new Date());

    await this.getData(true, '');
  }

  handleRefresh(event) {
    this.getData(true, '', event);
  }

  getData(isFirstLoad, event, eventPullRefresh = null) {
    if (isFirstLoad) {
      this.currentPage = 0;
    }

    let currentPage = this.currentPage;

    if (this.currentPage * this.dataLimit >= this.countData) {
      console.log('masuk sini');
      console.log(`${this.currentPage * this.dataLimit} >= ${this.countData}`);
      event?.target?.complete();
      return;
    }

    // console.log(`Current page awal : ${}`)

    this.currentPage++;

    let uri = 'list/deliveries';

    this.restService
      .getting(uri, {
        order: 'created_at',
        sort: 'desc',
        limit: this.dataLimit,
        offset: currentPage*this.dataLimit,
      })
      .then((res) => {
        if (isFirstLoad) {
          this.data = res.data.data;
          this.myContent.scrollToTop(400);
        } else {
          let data = this.data.concat(res.data.data);
          this.data = data;
        }

        this.countData = res.data.record;

        if (isFirstLoad == false) {
          event?.target?.complete();
        }

        if (eventPullRefresh) {
          eventPullRefresh.target.complete();
        }
      });
  }

  getMoreData(event) {
    this.getData(false, event);
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

  go(to) {
    this.navCtrl.navigateForward(to);
  }
}
