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
      //{ path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'library', loadChildren: () => import('./Library/library.module').then(m => m.LibraryModule) },  // lazy loaded inside layout wrapper
      { path: 'dashboard', component: DashboardComponent },
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