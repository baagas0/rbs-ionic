import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-resources',
  templateUrl: 'resources.page.html',
  styleUrls: ['resources.page.scss'],
})
export class Resources {
  tab: string = 'equipment';
  addPage: string = '/pages/fuel/form/usage';

  public formData: FormGroup;
  showDatePicker: boolean = false;
  dataProductions: any = [];
  hasData: boolean = true;

  dataEquipment: any = [];
  dataDriver: any = [];

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private location: Location
  ) {}

  async ngOnInit() {
    this.formData = new FormGroup({
      valDate: new FormControl(),
    });

    this.formData.controls['valDate'].setValue(new Date());
    this.getData();
  }

  getData() {
    if (this.tab == 'equipment') {
      let uri = 'list/equipments';

      this.restService.getting(uri, {}).then((res) => {
        this.dataEquipment = res.data;
        console.log(this.dataEquipment);
      });
    } else if (this.tab == 'driver') {
      let uri = 'list/drivers';

      this.restService.getting(uri, {}).then((res) => {
        this.dataDriver = res.data;
      });
    }
  }

  selectTab(tab) {
    console.log(tab);
    this.tab = tab;
    this.addPage = `/pages/fuel/form/${this.tab}`;
    this.getData();
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
