import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../shared/modules/material.module";
import { SharedModule } from "../shared/shared.module";
import { ActivityRoutingModule } from "./activity-routing.module";
import { BorrowingTransactionComponent } from './borrowing-transaction/borrowing-transaction.component';
import { AddBorrowingTransactionDialogComponent } from './borrowing-transaction/add-borrowing-transaction-dialog/add-borrowing-transaction-dialog.component';


@NgModule({
    declarations: [
    BorrowingTransactionComponent,
    AddBorrowingTransactionDialogComponent,
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ActivityRoutingModule, //Routes
        MaterialModule,
        FlexLayoutModule,
        SharedModule,
    ]
  })
  export class ActivityModule {}