import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: 'pages.page.html',
  styleUrls: ['pages.page.scss'],
})
export class TabsPage implements OnInit {
  closed$ = new Subject<any>();
  showTabs = true; // <-- show tabs by default

  tabActive: string = '';

  constructor(private _router: Router) {}

  ngOnInit() {
    this.checkTab();
  }

  checkTab() {
    this._router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this.closed$)
      )
      .subscribe((event) => {
        let url = event['url'];
        console.log(url);

        if (url.includes('form')) {
          console.log('hide tab');
          this.showTabs = false;
        }else {
          this.showTabs = true;
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
