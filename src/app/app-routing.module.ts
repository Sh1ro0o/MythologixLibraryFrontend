import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  //Layout
  {
    path: '', 
    component: LayoutComponent,
    children: [
      { path: 'library', loadChildren: () => import('./Library/library.module').then(m => m.LibraryModule) },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    ]
  },

  //Lazy loading
  { path: 'auth', loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // only forRoot here
  exports: [RouterModule]
})
export class AppRoutingModule {}