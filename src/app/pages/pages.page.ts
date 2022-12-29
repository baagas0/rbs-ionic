import { Component } from '@angular/core';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'pages.page.html',
  styleUrls: ['pages.page.scss'],
})
export class TabsPage {
  tabActive: string = '';

  constructor() {}

  onTabsWillChange(event) {
    this.tabActive = event.tab;
  }
}
