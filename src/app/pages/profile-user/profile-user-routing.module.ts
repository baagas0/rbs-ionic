import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileUser } from './profile-user.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileUser,
  },
  {
    path: 'update',
    loadChildren: () =>
          import('./update/update.module').then((m) => m.UpdateModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileUserRoutingModule {}
