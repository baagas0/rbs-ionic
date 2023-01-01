import { Injectable } from '@angular/core';
import {
  BackgroundColorOptions,
  StatusBar,
  Style,
} from '@capacitor/status-bar';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private alertController: AlertController) {}

  public async show(title, content) {

    const alert = await this.alertController.create({
      subHeader: title,
      message: content,
      buttons: ['OK'],
    });

    await alert.present();

  }
}
