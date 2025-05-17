import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../Shared/material/material.module";
import { LayoutComponent } from "./layout.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    LayoutComponent,
    SideBarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ]
})
export class LayoutModule {}
