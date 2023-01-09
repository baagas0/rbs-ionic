import { Injectable } from '@angular/core';
import {
  BackgroundColorOptions,
  StatusBar,
  Style,
} from '@capacitor/status-bar';
import {
  AlertController,
  LoadingController,
  LoadingOptions,
  SpinnerTypes,
  ToastController,
} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  public async show(title, message) {
    const alert = await this.alertController.create({
      subHeader: title,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  public async showToast(
    message,
    position: 'top' | 'middle' | 'bottom' = 'bottom'
  ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

  public async loading(
    autoShow = true,
    message = 'Loading...',
    spinner: SpinnerTypes = 'circles'
  ) {
    const loading = await this.loadingCtrl.create({
      message: message,
      // duration: 3000,
      spinner: spinner,
    });

    if (autoShow) {
      loading.present();
    }

    return loading;
  }
}
