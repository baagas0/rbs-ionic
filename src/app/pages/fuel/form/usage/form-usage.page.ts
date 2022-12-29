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
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.formData = this.formBuilder.group({
      production_unit_id: new FormControl(),
      code: new FormControl(),
      date: new FormControl(),
      warehouse_id: new FormControl(),
      driver_id: new FormControl(),
      equipment_id: new FormControl(),
      customer_id: new FormControl(),
      customer_project_id: new FormControl(),
      flow_meter_start: new FormControl(0),
      flow_meter_end: new FormControl(0),
      quantity: new FormControl(),
      description: new FormControl(),
      created_by_name: new FormControl(),
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

  logForm() {
    let uri = 'create/fuel-usages';

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
