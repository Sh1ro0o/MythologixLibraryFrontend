import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './initial-auth/log-in/log-in.component';
import { RegisterComponent } from './initial-auth/register/register.component';
import { InitialAuthComponent } from './initial-auth/initial-auth.component';

const authRoutes: Routes = [
  {
    path: '',
    component: InitialAuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'log-in',
        pathMatch: 'full',
      },
      { 
        path: 'log-in', 
        component: LogInComponent,
      },
      { 
        path: 'register', 
        component: RegisterComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}