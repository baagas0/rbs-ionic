import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarComponentOptions } from 'ion2-calendar';
import { Subscription } from 'rxjs';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-history-equipment',
  templateUrl: 'history-equipment.page.html',
  styleUrls: ['history-equipment.page.scss'],
})
export class HistoryEquipment {
  public formData: FormGroup;
  equipment: any = {};
  lists: any = {
    data: [],
    record: 0,
  };

  public sub_date: Subscription;

  valDate: any = {
    from: '',
    to: '',
  };

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.formData = new FormGroup({
      date: new FormControl(),
    });

    this.valDate = {
      from: new Date('12/01/2022'),
      to: new Date('12/31/2022'),
    };
  }

  // async ngOnInit() {
  async ionViewDidEnter() {
    this.sub_date = this.formData.controls.date.valueChanges.subscribe(
      (value) => {
        this.getHistory();
      }
    );
    this.getData();
    this.getHistory();
  }

  getData() {
    let uri = `view/equipments/${this.activeRoute.snapshot.queryParams.equipment_id}`;

    this.restService.getting(uri, {}).then((res) => {
      this.equipment = res.data;
    });
  }

  getHistory() {
    let uri = `list/fuel-usages`;
    let params = {
      equipment_id: this.activeRoute.snapshot.queryParams.equipment_id,
      'date[]': [],
      // equipment_id: '83128ff2-df01-4689-b1bb-7819f1323b1a'
    };

    this.restService.getting(uri, params).then((res) => {
      this.lists = res.data;
    });
  }

  ionViewDidLeave() {
    console.log('unsubscribe');
    this.sub_date.unsubscribe();
  }

  go(to) {
    this.router.navigate([to]);
  }
}
