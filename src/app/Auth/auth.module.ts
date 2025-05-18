import { NgModule } from "@angular/core";
import { LogInComponent } from "./initial-auth/log-in/log-in.component";
import { RegisterComponent } from "./initial-auth/register/register.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { MaterialModule } from "../Shared/material/material.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { InitialAuthComponent } from './initial-auth/initial-auth.component';
import { SharedModule } from "../Shared/shared.module";

@NgModule({
    declarations: [
        LogInComponent, 
        RegisterComponent,
        InitialAuthComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule, //Routes
        MaterialModule,
        FlexLayoutModule,
        SharedModule
    ]
  })
  export class AuthModule {}