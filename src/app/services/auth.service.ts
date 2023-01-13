import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';
import { RestService } from './rest.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /** Data unit produksi id yang di pilih dari home */
  private unit_production_id: Subject<number> = new Subject<number>();

  constructor(
    private storage: StorageService,
    private navCtrl: NavController,
    // private restService: RestService
  ) {}

  async checkAuth() {
    const token = await this.storage.get('token');

    if (token != null) {
      return true;
    } else {
      return false;
    }
  }

  async setAuth(data) {
    /** Save ke storage */
    data.profile.photo =
      // 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png';
      await this.storage.set('user-id', data.profile.id);
      await this.storage.set('profile', data.profile);
      await this.storage.set('corporate', data.corporate);
      await this.storage.set('production_unit', data.token);
      await this.storage.set('token', data.token);
      await this.storage.set('permissions', data.permissions);
  }

  async getProfile() {
    return await this.storage.get('profile');
  }

  public getUP(): Observable<number> {
    return this.unit_production_id.asObservable();
  }

  public setUP(data: number): void {
    this.unit_production_id.next(data);
    this.storage.set('production_unit', data);
  }

  async logout() {
    await this.storage.remove('profile');
    await this.storage.remove('corporate');
    await this.storage.remove('production_unit');
    await this.storage.remove('token');
    await this.storage.remove('permissions');

    await this.navCtrl.navigateRoot('/auth/login');
  }
}
