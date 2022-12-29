import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-production',
  templateUrl: 'production.page.html',
  styleUrls: ['production.page.scss'],
})
export class Production {
  public formData: FormGroup;
  showDatePicker: boolean = false;
  dataProductions: any = [];
  hasData: boolean = true;

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService
  ) {}

  async ngOnInit() {
    this.formData = new FormGroup({
      valDate: new FormControl(),
    });

    this.formData.controls['valDate'].setValue(new Date());

    await this.getProduction();
  }

  async getProduction() {
    let uri = 'list/production';
    let params = {
      search: '',
    };

    let res = await this.restService.getting(uri, params);
    this.dataProductions = res.data.data;

    if (this.dataProductions.length == 0) {
      this.hasData = false;
    }
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
}
