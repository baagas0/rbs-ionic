import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/pages/dashboard',
        pathMatch: 'full',
      },
      // {
      //   path: 'login',
      //   loadChildren: () =>
      //     import('./login/login.module').then((m) => m.LoginModule),
      // },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('./report/report.module').then((m) => m.ReportModule),
      },
      {
        path: 'delivery',
        loadChildren: () =>
          import('./delivery/delivery.module').then((m) => m.DeliveryModule),
      },

      {
        path: 'fuel',
        loadChildren: () =>
          import('./fuel/fuel.module').then((m) => m.FuelModule),
      },
      {
        path: 'resources',
        loadChildren: () =>
          import('./resources/resources.module').then((m) => m.ResourcesModule),
      },
      {
        path: 'production',
        loadChildren: () =>
          import('./production/production.module').then(
            (m) => m.ProductionModule
          ),
      },
      {
        path: 'driver',
        loadChildren: () =>
          import('./driver/driver.module').then((m) => m.DriverModule),
      },
      {
        path: '',
        redirectTo: '/pages/dashboard',
        pathMatch: 'full',
      },
    ],
  },

  // {
  //   path: 'fuel',
  //   loadChildren: () =>
  //     import('./fuel-old/fuel.module').then((m) => m.FuelPageModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
