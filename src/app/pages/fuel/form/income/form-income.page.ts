import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
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
    private navCtrl: NavController,
    // private alertController: AlertController
    private alertService: AlertService
  ) {
    this.formData = this.formBuilder.group({
      production_unit_id: new FormControl('', Validators.required),
      vendor_id: new FormControl('', Validators.required),
      equipment_id: new FormControl('', Validators.required),
      customer_id: new FormControl(''),
      warehouse_id: new FormControl('', Validators.required),

      code: new FormControl(''),
      date: new FormControl(''),
      description: new FormControl(''),
      docket_number: new FormControl('', Validators.required),
      purchase_order: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      created_by_name: new FormControl(''),
    });
  }

  async ngOnInit() {
    // this.formData = new FormGroup({
    //   valDate: new FormControl(),
    // });
    // this.formData.controls['valDate'].setValue(new Date());
  }

  async logForm() {
    if (this.formData.status != 'VALID') {
      this.alertService.show('Error', 'Form tidak valid');
      return;
    }

    const loading = await this.alertService.loading();

    let uri = 'create/fuel-incomes';

    this.restService
      .post(uri, this.formData.value, {})
      .subscribe(async (resp) => {
        const data = resp.data;

        console.log(resp);
        await loading.dismiss();
        this.alertService.show('Berhasil', 'Data berhasil disimpan');

        this.navCtrl.navigateBack('/pages/fuel');
        // this.navCtrl.navigateBack()
      });
  }

  go(to) {
    this.router.navigate([to]);
  }
}
