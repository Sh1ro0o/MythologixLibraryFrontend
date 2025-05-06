import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';

const authRoutes: Routes = [
  { 
    path: 'log-in', 
    component: LogInComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}