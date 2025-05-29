import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../shared/modules/material.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from "../shared/shared.module";
import { UsersComponent } from "./users/users.component";
import { AdminRoutingModule } from "./admin-routing.module";

@NgModule({
    declarations: [
        UsersComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule, //Routes
        MaterialModule,
        FlexLayoutModule,
        SharedModule,
    ]
  })
  export class AdminModule {}