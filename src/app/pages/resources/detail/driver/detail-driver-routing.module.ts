import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DetailResourcesDriver } from './detail-driver.page';

const routes: Routes = [
  {
    path: '',
    component: DetailResourcesDriver,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule, ReactiveFormsModule],
  exports: [RouterModule],
})
export class DetailResourcesDriverRoutingModule {}
