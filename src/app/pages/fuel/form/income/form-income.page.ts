import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-form-income',
  templateUrl: 'form-income.page.html',
  styleUrls: ['form-income.page.scss'],
})
export class FormFuelIncome {
  formData: FormGroup;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private formBuilder: FormBuilder,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.formData = this.formBuilder.group({
      production_unit_id: new FormControl(),
      vendor_id: new FormControl(),
      equipment_id: new FormControl(),
      customer_id: new FormControl(),
      warehouse_id: new FormControl(),

      code: new FormControl(),
      date: new FormControl(),
      description: new FormControl(),
      docket_number: new FormControl(),
      purchase_order: new FormControl(),
      quantity: new FormControl(),
      created_by_name: new FormControl(),
    });
  }

  async ngOnInit() {
    // this.formData = new FormGroup({
    //   valDate: new FormControl(),
    // });
    // this.formData.controls['valDate'].setValue(new Date());
  }

  logForm() {
    let uri = 'create/fuel-incomes';

    this.restService
      .post(uri, this.formData.value, {})
      .subscribe(async (resp) => {
        const data = resp.data;

        console.log(resp);

        this.navCtrl.navigateBack('/pages/fuel');
        // this.navCtrl.navigateBack()
      });
  }

  go(to) {
    this.router.navigate([to]);
  }
}
