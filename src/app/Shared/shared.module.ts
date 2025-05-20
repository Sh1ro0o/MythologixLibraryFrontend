import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingCircleDirective } from "./directives/loading-circle.directive";
import { TreeComponent } from './components/tree/tree.component';
import { MaterialModule } from "./modules/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    LoadingCircleDirective,
    TreeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [
    LoadingCircleDirective,
    TreeComponent
  ]
})
export class SharedModule {}