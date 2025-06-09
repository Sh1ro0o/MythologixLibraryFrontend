import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BorrowingTransactionComponent } from "./borrowing-transaction/borrowing-transaction.component";
import { BorrowingStatus } from "../shared/enums/borrowing-status.enum";

const activityRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'borrowed',
        pathMatch: 'full',
      },
      {
        path: 'borrowed',
        component: BorrowingTransactionComponent,
        data: { status: BorrowingStatus.borrowed }
      },
      {
        path: 'returned',
        component: BorrowingTransactionComponent,
        data: { status: BorrowingStatus.returned }
      },
      {
        path: 'overdue',
        component: BorrowingTransactionComponent,
        data: { status: BorrowingStatus.overdue }
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(activityRoutes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule {}