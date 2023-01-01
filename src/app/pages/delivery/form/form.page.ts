import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-form',
  templateUrl: 'form.page.html',
  styleUrls: ['form.page.scss'],
})
export class Form {
  public formData: FormGroup;
  showDatePicker: boolean = false;
  dataProductions: any = [];
  hasData: boolean = true;
  forms: FormGroup;

  /** Data Untuk Form */
  dataUp: any = []; // Data Unit Produksi
  dataDriver: any = []; // Data Unit Produksi
  dataEquipment: any = []; // Data Unit Produksi
  dataCustomerProject: any = []; // Data Unit Produksi
  dataProduct: any = []; // Data Unit Produksi

  pageDriver: any = 1;
  countDriver: any = 0;

  selectDriver: any;

  /** Subscription */
  private sub_production_unit_id: Subscription;
  private sub_customer_project_id: Subscription;
  private sub_product: Subscription;
  private sub_quantity: Subscription;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.formData = new FormGroup({
      production_unit_id: new FormControl('', Validators.required),
      customer_id: new FormControl('', Validators.required),
      customer_project_id: new FormControl('', Validators.required),
      product_id: new FormControl('', Validators.required),
      product: new FormControl('', Validators.required),
      equipment_id: new FormControl('', Validators.required),
      driver_id: new FormControl('', Validators.required),
      date: new FormControl(''),
      docket_number: new FormControl('', Validators.required),
      purchase_order: new FormControl('', Validators.required),
      invoice_number: new FormControl('', Validators.required),
      distance: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required),
      product_price: new FormControl(''),
      total_net_price: new FormControl('', Validators.required),

      date_due: new FormControl(),
      vat: new FormControl(),
      vat_amount: new FormControl(),
      start_delivery: new FormControl(),
      end_delivery: new FormControl(),
      description: new FormControl(),
    });

    console.log(this.formData);

    this.sub_production_unit_id = this.formData.controls[
      'production_unit_id'
    ].valueChanges.subscribe((value) => {
      this.getDistance();
    });
    this.sub_customer_project_id = this.formData.controls[
      'customer_project_id'
    ].valueChanges.subscribe((value) => {
      this.getDistance();
    });
    this.sub_product = this.formData.controls['product'].valueChanges.subscribe(
      (value) => {
        this.formData.controls['product_price'].setValue(
          this.formData.controls['product'].value['price']
        );
      }
    );

    this.sub_quantity = this.formData.controls[
      'quantity'
    ].valueChanges.subscribe((value) => {
      this.formData.controls['total_net_price'].setValue(
        this.formData.controls['product_price'].value * value
      );
    });
  }

  ionViewDidLeave() {
    console.log('Leave Page');
    this.sub_production_unit_id.unsubscribe();
    this.sub_customer_project_id.unsubscribe();
    this.sub_product.unsubscribe();
    this.sub_quantity.unsubscribe();
  }

  getDistance() {
    let production_unit_id = this.formData.controls['production_unit_id'].value;
    let customer_project_id =
      this.formData.controls['customer_project_id'].value;

    if (production_unit_id && customer_project_id) {
      this.restService
        .getting(
          `distance/deliveries/${production_unit_id}/${customer_project_id}`,
          {}
        )
        .then((res) => {
          console.log(res);
          this.formData.controls['distance'].setValue(res.data.distance);
        });
    }
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

    console.log(this.formData.value);
    let uri = 'create/deliveries';

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

        this.formData.reset();

        this.navCtrl.navigateForward('/pages/delivery');
        // this.navCtrl.navigateBack()
      });
  }
}
