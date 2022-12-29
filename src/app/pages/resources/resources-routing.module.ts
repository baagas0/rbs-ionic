import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Resources } from './resources.page';
// import { Form } from './form/form.page';

const routes: Routes = [
  {
    path: '',
    component: Resources,
  },
  {
    path: 'detail',
    loadChildren: () =>
          import('./detail/detail-routing.module').then((m) => m.DetailRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResourcesRoutingModule {}
