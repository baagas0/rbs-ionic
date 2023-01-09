import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';

import { Subject, Subscriber, Subscription } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { BarService } from '../services/bar.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'pages.page.html',
  styleUrls: ['pages.page.scss'],
})
export class TabsPage implements OnInit {
  closed$ = new Subject<any>();
  showTabs = true; // <-- show tabs by default

  urlActive: string = '';
  tabActive: string = '';
  backCounter: number = 0;

  subBackButton: Subscription;

  constructor(
    private _router: Router,
    private barService: BarService,
    private alertService: AlertService,
    private platform: Platform,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.checkTab();

    this.subBackButton = this.platform.backButton.subscribeWithPriority(
      10,
      () => {
        this.backCounter++;

        if (this.urlActive == '/pages/dashboard') {
          this.alertService.showToast('Tekan lagi untuk keluar');
        }

        if (this.backCounter > 1 && this.urlActive == '/pages/dashboard') {
          // this.platform.exitApp()
          (navigator as any).app.exitApp();
        } else if (this.urlActive.split('/').length == 3) {
          // this.alertService.showToast('Tekan lagi untuk keluar');
          // this.backCounter = 0;
          if (this.urlActive != '/pages/dashboard') {
            this.backCounter = 0;
          }
          this.navCtrl.navigateRoot('/pages/dashboard');
        } else {
          // this.navCtrl.setDirection('back');
          this.navCtrl.back();
          setTimeout(() => {
            // this.alertService.showToast('reset 0');
            this.backCounter = 0;
          }, 3000);
        }
      }
    );
  }

  checkTab() {
    this._router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this.closed$)
      )
      .subscribe(async (event) => {
        let url = event['url'];
        this.urlActive = url;

        /** Reset 0 ketika ganti page */
        if (this.urlActive != '/pages/dashboard') {
          this.backCounter = 0;
        }

        /** Set Tab Bottom */
        // if (url.includes('form')) {
        if (url.split('/').length == 3) {
          console.log('hide tab');
          this.showTabs = true;
        } else {
          this.showTabs = false;
        }

        /** Set Status Bar Color */
        if (url.includes('form')) {
          await this.barService.change({ color: '#1f4f94' });
        } else {
          await this.barService.change({ color: '#ffffff' });
        }
      });
  }

  ngOnDestroy() {
    this.closed$.next(); // <-- close subscription when component is destroyed
    this.subBackButton.unsubscribe();
  }

  onTabsWillChange(event) {
    this.tabActive = event.tab;
  }
}
