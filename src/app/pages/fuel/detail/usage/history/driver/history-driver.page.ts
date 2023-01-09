import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarComponentOptions } from 'ion2-calendar';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-history-driver',
  templateUrl: 'history-driver.page.html',
  styleUrls: ['history-driver.page.scss'],
})
export class HistoryDriver {
  public formData: FormGroup;
  driver: any = {};
  lists: any = {
    data: [],
    record: 0,
  };

  public sub_date: Subscription;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.formData = new FormGroup({
      date: new FormControl(),
    });
  }

  async ionViewDidEnter() {
    this.sub_date = this.formData.controls.date.valueChanges.subscribe(
      (value) => {
        this.getHistory();
      }
    );
    this.getData();
    this.getHistory();
  }

  getData() {
    let uri = `view/drivers/${this.activeRoute.snapshot.queryParams.driver_id}`;

    this.restService.getting(uri, {}).then((res) => {
      this.driver = res.data;
    });
  }

  getHistory() {
    let uri = `list/fuel-usages`;
    let params = {
      driver_id: this.activeRoute.snapshot.queryParams.driver_id,
      'date[]': [],
      // driver_id: '83128ff2-df01-4689-b1bb-7819f1323b1a'
    };

    this.restService.getting(uri, params).then((res) => {
      this.lists = res.data;
    });
  }

  ionViewDidLeave() {
    console.log('unsubscribe');
    this.sub_date.unsubscribe();
  }

  go(to) {
    this.router.navigate([to]);
  }
}
