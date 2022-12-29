import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HistoryDriver } from './history-driver.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryDriver,
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
export class HistoryDriverRoutingModule {}
