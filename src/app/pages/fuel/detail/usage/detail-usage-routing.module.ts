import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DetailFuelUsage } from './detail-usage.page';

const routes: Routes = [
  {
    path: '',
    component: DetailFuelUsage,
  },
  {
    path: 'history',
    loadChildren: () =>
          import('./history/history-routing.module').then((m) => m.HistoryRoutingModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
})
export class DetailFuelUsageRoutingModule {}
