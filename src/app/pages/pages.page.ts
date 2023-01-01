import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';
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

  tabActive: string = '';

  constructor(private _router: Router, private barService: BarService, private alertService: AlertService) {}

  ngOnInit() {
    this.checkTab();
  }

  checkTab() {
    this._router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this.closed$)
      )
      .subscribe(async (event) => {
        let url = event['url'];

        /** Set Tab Bottom */
        if (url.includes('form')) {
          console.log('hide tab');
          this.showTabs = false;
        }else {
          this.showTabs = true;
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
  }

  onTabsWillChange(event) {
    this.tabActive = event.tab;
  }
}
