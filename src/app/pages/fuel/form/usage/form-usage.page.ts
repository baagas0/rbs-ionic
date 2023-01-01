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
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-form-usage',
  templateUrl: 'form-usage.page.html',
  styleUrls: ['form-usage.page.scss'],
})
export class FormFuelUsage {
  formData: FormGroup;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private formBuilder: FormBuilder,
    private router: Router,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.formData = this.formBuilder.group({
      production_unit_id: new FormControl('', Validators.required),
      code: new FormControl(''),
      date: new FormControl(''),
      warehouse_id: new FormControl('', Validators.required),
      driver_id: new FormControl('', Validators.required),
      equipment_id: new FormControl('', Validators.required),
      customer_id: new FormControl(''),
      customer_project_id: new FormControl('', Validators.required),
      flow_meter_start: new FormControl(''),
      flow_meter_end: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      description: new FormControl(''),
      created_by_name: new FormControl(''),
    });

    this.formData.controls['warehouse_id'].valueChanges.subscribe((value) => {
      this.getFlowMeter();
    });

    this.formData.controls['flow_meter_start'].valueChanges.subscribe(
      (value) => {
        this.calcFlowMeterEnd();
      }
    );

    this.formData.controls['quantity'].valueChanges.subscribe((value) => {
      this.calcFlowMeterEnd();
    });
  }

  calcFlowMeterEnd() {
    let flow_meter_end = this.formData.controls['flow_meter_end'];
    let flow_meter_start = this.formData.controls['flow_meter_start'];
    let quantity = this.formData.controls['quantity'];

    if (!flow_meter_start.value) {
      this.getFlowMeter();
      return;
    }

    flow_meter_end.setValue(flow_meter_start.value + quantity.value);
  }

  getFlowMeter() {
    this.restService
      .getting(
        `fuel-usages/flow-meter/${this.formData.controls['warehouse_id'].value}`,
        {}
      )
      .then((res) => {
        console.log(res);
        this.formData.controls['flow_meter_start'].setValue(
          res.data.flow_meter_start
        );
      });
  }

  async logForm() {

    if (this.formData.status != 'VALID') {
      const alert = await this.alertController.create({
        subHeader: 'Error',
        message: "Form tidak valid",
        buttons: ['OK'],
      });

      await alert.present();

      return;
    }

    let uri = 'create/fuel-usages';

    this.restService
      .post(uri, this.formData.value, {})
      .subscribe(async (resp) => {
        const data = resp.data;

        console.log(resp);

        const alert = await this.alertController.create({
          subHeader: 'Berhasil',
          message: "Data Berhasil Disimpan",
          buttons: ['OK'],
        });
  
        await alert.present();

        this.navCtrl.navigateBack('/pages/fuel');
        // this.navCtrl.navigateBack()
      });
  }

  go(to) {
    this.router.navigate([to]);
  }
}
