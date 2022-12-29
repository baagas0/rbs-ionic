import { Location } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarComponentOptions } from 'ion2-calendar';
import { RestService } from 'src/app/services/rest.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-history-equipment',
  templateUrl: 'history-equipment.page.html',
  styleUrls: ['history-equipment.page.scss'],
})
export class HistoryEquipment {
  public formData: FormGroup;
  showDatePicker: boolean = true;
  
  valDate: any = {
    from: '',
    to: '',
  };
  valDateOptions: CalendarComponentOptions = {
    pickMode: 'range',
    from: new Date(2021, 0, 1), // days click enabled from;
    to: new Date(2024, 8, 15), // days click enabled to;
  };

  constructor(
    @Inject(LOCALE_ID) locale: string,
    private restService: RestService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.valDate = {
      from: new Date('12/01/2022'),
      to: new Date('12/31/2022'),
    };
  }

  async ngOnInit() {
    // this.formData = new FormGroup({
    //   valDate: new FormControl(),
    // });

    // this.formData.controls['valDate'].setValue(new Date());
  }

  logForm() {
  }

  dateChange(value) {
    
  }

  go(to) {
    this.router.navigate([to]);
  }
}
