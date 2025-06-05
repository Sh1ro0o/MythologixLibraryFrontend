import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { DomainGuard } from './guards/domain.guard';
import { UserContentGuard } from './guards/user-content.guard';
import { LoginRegisterGuard } from './guards/login-register.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminContentGuard } from './guards/admin-content.guard';

const routes: Routes = [
  //Layout
  {
    path: '', 
    component: LayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [DomainGuard] },
      { path: 'library', canActivate: [UserContentGuard], loadChildren: () => import('./Library/library.module').then(m => m.LibraryModule) },
      { path: 'dashboard', canActivate: [UserContentGuard], component: DashboardComponent },
      { path: 'admin', canActivate: [AdminContentGuard], loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
      { path: 'activity', canActivate: [UserContentGuard], loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule) },
    ]
  },

  //Lazy loading
  { 
    path: 'auth', canActivate: [LoginRegisterGuard], loadChildren: () => import('./Auth/auth.module').then(m => m.AuthModule)
  },

  //Not Found
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // only forRoot here
  exports: [RouterModule]
})
export class AppRoutingModule {}