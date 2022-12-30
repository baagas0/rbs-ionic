import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { AuthService } from './services/auth.service';
import { RestService } from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    
  ) {}

  async ngOnInit() {
    const check = await this.auth.checkAuth();
    if (!check) {
      // this.navCtrl.navigateRoot('/pages/dashboard');
      this.navCtrl.navigateRoot('/auth/login');
    } else {
      // auth.logout();
    }
  }

  
}
