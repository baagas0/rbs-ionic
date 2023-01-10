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
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-form-usage',
  templateUrl: 'form-usage.page.html',
  styleUrls: ['form-usage.page.scss'],
})
export class FormFuelUsage {
  formData: FormGroup;

  sub_warehouse_id: Subscription;
  sub_flow_meter_start: Subscription;
  sub_quantity: Subscription;

  flow_meter_start;
  quantity;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private formBuilder: FormBuilder,
    private router: Router,
    private navCtrl: NavController,
    // private alertController: AlertController,
    private alertService: AlertService
  ) {}

  async ngOnInit() {
    this.formData = this.formBuilder.group({
      production_unit_id: new FormControl('', Validators.required),
      code: new FormControl(''),
      date: new FormControl(''),
      warehouse_id: new FormControl('', Validators.required),
      warehouse_id_array: new FormControl(''),
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

    this.sub_warehouse_id = this.formData.controls[
      'warehouse_id'
    ].valueChanges.subscribe((value) => {
      // console.log('warehouse',this.formData.controls.warehouse_id_array.value);
      this.getFlowMeter();
    });

    this.sub_flow_meter_start = this.formData.controls[
      'flow_meter_start'
    ].valueChanges.subscribe((value) => {
      // this.calcFlowMeterEnd();
    });

    this.sub_quantity = this.formData.controls[
      'quantity'
    ].valueChanges.subscribe((value) => {
      // console.log(value);
      console.log('');
      this.calcFlowMeterEnd();
    });
  }

  calcFlowMeterEnd() {
    let flow_meter_end = this.formData.controls['flow_meter_end'];
    let flow_meter_start = this.formData.controls['flow_meter_start'];
    let quantity = this.formData.controls['quantity'];

    if (!this.formData.controls['warehouse_id'].value) {
      this.alertService.show(
        'Peringatan',
        'Flow meter akhir tidak dapat diproses karena belum memilih gudang'
      );
      // quantity.setValue('');
      return;
    }

    if (flow_meter_start.value === '') {
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
      this.alertService.show('Peringatan', 'Form tidak valid');

      return;
    }
    const loading = await this.alertService.loading();

    let uri = 'create/fuel-usages';

    this.restService
      .post(uri, this.formData.value, {})
      .subscribe(async (resp) => {
        const data = resp.data;

        console.log(data);

        loading.dismiss();
        this.alertService.show('Berhasil', 'Data Berhasil Disimpan');
        await this.alertService.show(
          'Debug',
          `Rincian data pengiriman untuk pengisian ini => jarak: ${data.distance} KM,volume: ${data.volume},rit: ${data.rit},average: ${data.average}`
        );

        this.navCtrl.navigateForward('/pages/fuel');
        // this.navCtrl.navigateBack('/pages/fuel');
        // this.navCtrl.navigateBack()
      }, async (err) => {
        await loading.dismiss();
      });
  }

  ionViewDidLeave() {
    console.log('Leave Page');
    this.sub_warehouse_id.unsubscribe();
    this.sub_flow_meter_start.unsubscribe();
    this.sub_quantity.unsubscribe();
  }

  go(to) {
    this.router.navigate([to]);
  }
}
