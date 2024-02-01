import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { usermanagerGuard } from './usermanager.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  { path: 'login', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'blog',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canMatch: [usermanagerGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
