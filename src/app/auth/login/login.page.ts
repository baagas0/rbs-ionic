import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonModal, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  public loginForm: FormGroup;

  constructor(
    private rest: RestService,
    public navCtrl: NavController,
    public auth: AuthService,
    public storage: StorageService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      mobile: new FormControl(true),
    });

    const check = await this.auth.checkAuth();

    if (check) {
      this.navCtrl.navigateRoot('/pages/dashboard');
    }
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      // duration: 3000,
      spinner: 'circles',
    });

    loading.present();
    this.rest.post('login', this.loginForm.value, {}).subscribe(
      async (resp) => {
        const data = resp.data;

        // Set auth
        await this.auth.setAuth(data);

        loading.dismiss();
        this.navCtrl.navigateRoot('/pages/dashboard');
      },
      async (err) => {
        // console.log(err)
        loading.dismiss();
      }
    );
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    // this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
