import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
} from '@angular/forms';
import { CalendarComponentOptions } from 'ion2-calendar';
import { IonicSelectableComponent } from 'ionic-selectable';
import * as moment from 'moment';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-input-date-range',
  templateUrl: './input-date-range.component.html',
  styleUrls: ['./input-date-range.component.scss'],
})
export class InputDateRangeComponent {
  @Input() type: string = 'picker';
  @Input() controlName: any;

  valueFormGroup?: FormGroup;

  valDateOptions: CalendarComponentOptions = {
    pickMode: 'range',
    from: new Date(2021, 0, 1), // days click enabled from;
    to: new Date(2024, 8, 15), // days click enabled to;
  };

  valDate: any = {
    from: new Date(),
    to: new Date(),
  };

  constructor(
    private storage: StorageService,
    private formGroupDirective: FormGroupDirective
  ) {}

  async dateChange(event) {
    console.log(event);
    if (this.type == 'picker') {
      await this.storage.set('date', event);
    }

    if(this.controlName) {
      this.valueFormGroup?.controls[this.controlName]?.setValue(event.value);
    }
  }

  async ngOnInit() {
    if(this.controlName) {
      this.valueFormGroup = this.formGroupDirective.form;
    }

    if (this.type == 'picker') {
      let date = await this.storage.get('date');
      console.log('date', date);
      if(date == null) {
        this.valDate = {
          from: moment().format('YYYY-MM-DD'),
          to: moment().format('YYYY-MM-DD'),
        };
        this.valueFormGroup?.controls[this.controlName]?.setValue(this.valDate);
        await this.storage.set('date', this.valDate);
      }else {
        this.valDate = date;
      }
    }
  }
}
