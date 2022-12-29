import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-detail-income',
  templateUrl: 'detail-income.page.html',
  styleUrls: ['detail-income.page.scss'],
})
export class DetailFuelIncome {
  detail: any = {};

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private navCtrl: NavController
  ) {
  }

  async ngOnInit() {
    this.getData();
  }

  getData() {
    let uri = `view/fuel-incomes/${this.activeRoute.snapshot.queryParams.id}`;

    this.restService.getting(uri, {}).then((res) => {
      this.detail = res.data;
    });
  }

}
