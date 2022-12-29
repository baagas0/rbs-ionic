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
import { IonicSelectableComponent } from 'ionic-selectable';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent {
  @Input() uri: any;
  @Input() controlName: any;
  @Input() controlNameArray: any;
  @Input() placeholder: any = 'Pilih Data';

  valueFormGroup?: FormGroup;

  dataLimit: number = 20;                               
  dataSelected: any;

  datas: any = []; // Data Lookup

  currentPage: any = 1;
  countData: any = 0;

  constructor(
    private storage: StorageService,
    private restService: RestService,
    private formGroupDirective: FormGroupDirective
  ) {}

  async ngOnInit() {
    this.valueFormGroup = this.formGroupDirective.form;

    if (this.uri == 'production-units') {
      this.dataSelected = await this.storage.get(
        'production_unit_id_array'
      );
      this.valueFormGroup.controls[this.controlName].setValue(this.dataSelected.id);
    }
  }

  async getData() {
    await this.restService
      .getting(`lookup/${this.uri}`, {
        order: 'created_at',
        limit: this.dataLimit,
        offset: this.currentPage,
      })
      .then(async (res) => {
        this.datas = res.data.data;
        this.countData = res.data.record;

        
      });
  }

  async dataChange(event) {
    if (this.uri == 'production-units') {
      await this.storage.set('production_unit_id', event.value.id);
      await this.storage.set('production_unit_id_array', event.value);
    }

    this.valueFormGroup.controls[this.controlName].setValue(event.value.id);
    if(this.controlNameArray) {
      console.log(`this.controlNameArray: ${this.controlNameArray}`);
      this.valueFormGroup.controls[this.controlNameArray].setValue(event.value);
      console.log(this.valueFormGroup.value);
    }
  }

  async getMoreData(event: {
    component: IonicSelectableComponent;
    text: string;
  }) {
    if ((this.currentPage * this.dataLimit) >= this.countData) {
      event.component.disableInfiniteScroll();
      return;
    }

    this.currentPage++;

    let uri = `lookup/${this.uri}`;

    await this.restService
      .getting(uri, {
        order: 'created_at',
        limit: this.dataLimit,
        offset: this.currentPage,
      })
      .then((res) => {
        let data = event.component.items.concat(res.data.data);

        event.component.items = data;

        event.component.endInfiniteScroll();
      });
  }
}
