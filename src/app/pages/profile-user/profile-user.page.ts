import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: 'profile-user.page.html',
  styleUrls: ['profile-user.page.scss'],
})
export class ProfileUser {
  profile: any = {};
  constructor(
    public authService: AuthService,
    public restService: RestService,
    public navCtrl: NavController,
    public alertService: AlertService,
    public storageService: StorageService
  ) {}

  async ngOnInit() {}

  async ionViewDidEnter() {
    // this.profile = await this.authService.getProfile();
    // console.log(this.profile);
    await this.getData();
  }

  async getData() {
    let uri = `profile`;
    // const loading = await this.alertService.loading();

    this.restService.getting(uri, {}).then(
      (res) => {
        this.profile = res.data;
        console.log(this.profile);
        this.storageService.set('profile', this.profile)
        // loading.dismiss();
      },
      (error) => {
        // loading.dismiss();
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
