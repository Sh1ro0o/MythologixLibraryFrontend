import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../shared/modules/material.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from "../shared/shared.module";
import { BooksComponent } from "./books/books.component";
import { LibraryRoutingModule } from "./library-routing.module";

@NgModule({
    declarations: [
        BooksComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LibraryRoutingModule, //Routes
        MaterialModule,
        FlexLayoutModule,
        SharedModule,
    ]
  })
  export class LibraryModule {}