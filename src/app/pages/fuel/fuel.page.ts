import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-fuel',
  templateUrl: 'fuel.page.html',
  styleUrls: ['fuel.page.scss'],
})
export class Fuel {
  tab: string = 'usage';
  addPage: string = '/pages/fuel/form/usage';

  public formData: FormGroup;
  showDatePicker: boolean = false;
  hasData: boolean = true;

  dataUsage: any = [];
  dataIncome: any = [];

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private location: Location,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    this.formData = new FormGroup({
      valDate: new FormControl(),
    });

    this.formData.controls['valDate'].setValue(new Date());

    this.getData();
  }

  selectTab(tab) {
    console.log(tab);
    this.tab = tab;
    this.addPage = `/pages/fuel/form/${this.tab}`;
    this.getData();
  }

  getData() {
    let uri = `list/fuel-${this.tab}s`;

    this.restService.getting(uri, {}).then((res) => {
      if (this.tab == 'usage') {
        this.dataUsage = res.data.data;
        console.log(this.dataUsage);
      } else if (this.tab == 'income') {
        this.dataIncome = res.data.data;
        console.log(this.dataIncome);
      }
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
    this.navCtrl.navigateForward(to)
  }
}
