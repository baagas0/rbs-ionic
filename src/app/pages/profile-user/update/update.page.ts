import { Component, Inject, LOCALE_ID } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { RestService } from 'src/app/services/rest.service';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-update',
  templateUrl: 'update.page.html',
  styleUrls: ['update.page.scss'],
})
export class Update {
  public formData: FormGroup;
  public birth_date: any;
  public birth_place_id: any;
  public province_id: any;
  public city_id: any;
  public district_id: any;
  public sub_district_id: any;
  public gender: any;
  public images: any = '';

  constructor(
    private restService: RestService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    this.formData = new FormGroup({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      photo: new FormControl(''),
      password: new FormControl(''),
      gender: new FormControl(''),
      birth_date: new FormControl(''),
      birth_place_id: new FormControl(''),
      religion_id: new FormControl(''),
      province_id: new FormControl(''),
      city_id: new FormControl(''),
      district_id: new FormControl(''),
      sub_district_id: new FormControl(''),
      address: new FormControl(''),
    });

    // this.formData.controls['birth_date'].valueChanges.subscribe((value) => {
    //   console.log('birth_date');
    //   console.log(value);
    // });

    await this.getData();
  }

  ionViewDidLeave() {}

  async imageUpload(_event) {
    const photo = _event.target.files[0];
    console.log(photo);

    let image_url = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(photo)
    );

    this.images = {
      src: image_url,
      name: photo.name,
      size: photo.size / 1024,
    };

    this.restService.uploadFile(photo).subscribe((res) => {
      this.formData.controls.photo.setValue(res.data.file);
    });
  }

  async getData() {
    const loading = await this.alertService.loading();

    this.restService.getting(`profile`, {}).then(
      async (res) => {
        this.birth_date = res.data.birth_date;

        this.birth_place_id = res.data.birth_place_id_name;

        this.province_id = res.data.province_name;
        this.city_id = res.data.city_name;
        this.district_id = res.data.district_name;
        this.sub_district_id = res.data.sub_district_name;

        this.gender = res.data.gender == 'L' ? 'Laki - Laki' : 'Perempuan';
        this.images = {
          src: res.data.photo_preview,
        };

        for (const [key, value] of Object.entries(res.data)) {
          let form = this.formData.controls[key];
          if (form && key != 'password') {
            form.setValue(value);
          }
        }

        await loading.dismiss();
      },
      async (error) => {
        await loading.dismiss();
      }
    );
  }

  async logForm() {
    if (this.formData.status != 'VALID') {
      await this.alertService.show('Error', 'Form tidak valid');

      return;
    }

    const loading = await this.alertService.loading();

    console.log(this.formData.value);
    let uri = '/update/corporate-users';

    this.restService
      .patch(uri, this.formData.value, {})
      .subscribe(async (resp) => {
        const data = resp.data;

        console.log(resp);
        loading.dismiss();
        await this.alertService.show('Berhasil', 'Data berhasil disimpan');

        this.formData.reset();

        this.navCtrl.back();
        // this.navCtrl.navigateBack('/pages/profile-user');
        // this.navCtrl.navigateBack()
      });
  }
}
