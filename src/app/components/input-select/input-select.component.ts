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

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent {
  @Input() uri: any;
  @Input() controlName: any;
  @Input() placeholder: any = 'Pilih Data';

  valueFormGroup?: FormGroup;

  dataSelected: any;

  datas: any = []; // Data Lookup

  currentPage: any = 1;
  countData: any = 0;

  constructor(
    private restService: RestService,
    private formGroupDirective: FormGroupDirective
  ) {}

  async ngOnInit() {
    // console.log(this.uri)
    this.valueFormGroup = this.formGroupDirective.form;

    // await this.getData();
    console.log('cek');
  }

  ionViewDidEnter() {
    console.log(this.placeholder);
  }

  ionViewWillEnter() {
    console.log(this.placeholder);
  }

  async getData() {
    await this.restService
      .getting(`lookup/${this.uri}`, {
        order: 'created_at',
        limit: 12,
        offset: this.currentPage,
      })
      .then((res) => {
        // console.log(res.data.data);
        this.datas = res.data.data;
        this.countData = res.data.record;
      });
  }

  dataChange(event) {
    console.log(event);
    // console.log(this.valueFormGroup.controls['driver_id'].value);
    this.valueFormGroup.controls[this.controlName].setValue(event.value.id);
    console.log(this.valueFormGroup.value);
  }

  async getMoreData(event: {
    component: IonicSelectableComponent;
    text: string;
  }) {
    if (this.currentPage * 12 >= this.countData) {
      event.component.disableInfiniteScroll();
      return;
    }

    this.currentPage++;

    let uri = `lookup/${this.uri}`;

    await this.restService
      .getting(uri, {
        order: 'created_at',
        limit: 12,
        offset: this.currentPage,
      })
      .then((res) => {
        let data = event.component.items.concat(res.data.data);

        event.component.items = data;

        event.component.endInfiniteScroll();
      });
  }
}
