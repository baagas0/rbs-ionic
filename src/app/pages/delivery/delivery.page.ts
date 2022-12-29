import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-delivery',
  templateUrl: 'delivery.page.html',
  styleUrls: ['delivery.page.scss'],
})
export class Delivery {
  public formData: FormGroup;
  showDatePicker: boolean = false;

  data: any = [];

  hasData: boolean = true;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private location: Location,
  ) {}

  async ngOnInit() {
    this.formData = new FormGroup({
      valDate: new FormControl(),
    });

    this.formData.controls['valDate'].setValue(new Date());

    await this.getData();
  }

  getData() {
      let uri = 'list/deliveries';

      this.restService.getting(uri, {}).then((res) => {
        this.data = res.data;
        console.log(this.data);
      });
  }

  statusColor(status_code) {
    switch (status_code) {
      case 'PENDING':
        return 'danger';
        break;
      case 'PROGRESS':
        return 'warning';
        break;
      case 'SUCCESS':
        return 'success';
        break;

      default:
        return 'warning';
        break;
    }
  }

  go(to) {
    this.location.go(to);
  }
}
