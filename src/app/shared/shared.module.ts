import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoadingCircleDirective } from "./directives/loading-circle.directive";
import { TreeComponent } from './components/tree/tree.component';
import { MaterialModule } from "./modules/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { FilterComponent } from './components/filter/filter.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { BookCopyComponent } from "../Library/book-copy/book-copy.component";
import { UsersComponent } from "../admin/users/users.component";
import { AssistantComponent } from './components/assistant/assistant.component';

@NgModule({
  declarations: [
    LoadingCircleDirective,
    TreeComponent,
    FilterComponent,
    AlertDialogComponent,
    BookCopyComponent, //Library
    UsersComponent, //Admin
    AssistantComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    LoadingCircleDirective,
    TreeComponent,
    FilterComponent,
    AlertDialogComponent,
    AssistantComponent,
  ]
})
export class SharedModule {}