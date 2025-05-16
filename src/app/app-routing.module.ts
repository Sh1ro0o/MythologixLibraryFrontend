import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  //Standard loading
  { path: 'dashboard', component: DashboardComponent },

  //Lazy loading
  { path: 'auth', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // only forRoot here
  exports: [RouterModule]
})
export class AppRoutingModule {}