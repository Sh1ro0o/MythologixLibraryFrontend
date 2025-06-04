import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingCircleDirective } from "./directives/loading-circle.directive";
import { TreeComponent } from './components/tree/tree.component';
import { MaterialModule } from "./modules/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { FilterComponent } from './components/filter/filter.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';

@NgModule({
  declarations: [
    LoadingCircleDirective,
    TreeComponent,
    FilterComponent,
    AlertDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    LoadingCircleDirective,
    TreeComponent,
    FilterComponent,
    AlertDialogComponent,
  ]
})
export class SharedModule {}