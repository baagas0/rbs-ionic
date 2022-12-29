import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-detail-usage',
  templateUrl: 'detail-usage.page.html',
  styleUrls: ['detail-usage.page.scss'],
})
export class DetailFuelUsage {
  public formData: FormGroup;
  showDatePicker: boolean = false;

  detail: any = {};

  hasData: boolean = true;
  todo: FormGroup;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  async ngOnInit() {
    console.log('Param ID: ' + this.activeRoute.snapshot.queryParams.id);
    this.getData();
  }

  getData() {
    let uri = `view/fuel-usages/${this.activeRoute.snapshot.queryParams.id}`;

    this.restService.getting(uri, {}).then((res) => {
      this.detail = res.data;
    });
  }

  logForm() {
    console.log(this.todo);
  }

  go(to) {
    this.router.navigate([to]);
  }
}
