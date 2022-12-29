import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IonicSelectableComponent } from 'ionic-selectable';
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

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private formBuilder: FormBuilder
  ) {
  }

  async ngOnInit() {
    this.formData = new FormGroup({
      valDate: new FormControl(),
      production_unit_id: new FormControl(),
      driver_id: new FormControl(),
      equipment_id: new FormControl(),
    });
  }


  logForm() {
    console.log(this.formData.value);
  }
}
