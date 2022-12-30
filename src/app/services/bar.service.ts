import { Injectable } from '@angular/core';
import {
  BackgroundColorOptions,
  StatusBar,
  Style,
} from '@capacitor/status-bar';

@Injectable({
  providedIn: 'root',
})
export class BarService {
  constructor() {}

  public async change(color: BackgroundColorOptions) {
    // if (color.color.includes('#ffffff')) {
    //   await StatusBar.setStyle({ style: Style.Light });
    // } else {
    //   await StatusBar.setBackgroundColor(color);
    // }
    await StatusBar.setBackgroundColor(color);
  }
}
