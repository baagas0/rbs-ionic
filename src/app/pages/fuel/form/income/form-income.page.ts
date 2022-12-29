import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-form-income',
  templateUrl: 'form-income.page.html',
  styleUrls: ['form-income.page.scss'],
})
export class FormFuelIncome {
  public formData: FormGroup;
  showDatePicker: boolean = false;
  dataProductions: any = [];
  hasData: boolean = true;
  todo : FormGroup;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  async ngOnInit() {
    // this.formData = new FormGroup({
    //   valDate: new FormControl(),
    // });

    // this.formData.controls['valDate'].setValue(new Date());
  }

  logForm() {
    console.log(this.todo)
  }

  go(to) {
    this.router.navigate([to]);
  }
}
