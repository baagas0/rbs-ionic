import { Injectable } from '@angular/core';
import {
  BackgroundColorOptions,
  StatusBar,
  Style,
  StyleOptions,
} from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class BarService {
  constructor(private alertService: AlertService, private platform: Platform) {}

  public async change(color: BackgroundColorOptions) {
    // await this.platform.ready().then(async () => {
    //   await StatusBar.setStyle({ style: Style.Light }).then((data) => {
    //     this.alertService.show('CEK', JSON.stringify(data));
    //   });
    //   await StatusBar.setBackgroundColor(color);
    //   this.alertService.show('CEK1', JSON.stringify(await StatusBar.getInfo()));
    // });

    if (color.color.includes('#ffffff')) {
      await this.platform.ready().then(async () => {
        await StatusBar.setStyle({ style: Style.Light });
        await StatusBar.setBackgroundColor(color);
      });
    } else {
      await this.platform.ready().then(async () => {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor(color);
      });
    }
  }
}
