import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-borrowing-transaction-dialog',
  standalone: false,
  templateUrl: './add-borrowing-transaction-dialog.component.html',
  styleUrl: './add-borrowing-transaction-dialog.component.scss'
})
export class AddBorrowingTransactionDialogComponent {
  readonly dialogRef = inject(MatDialogRef<AddBorrowingTransactionDialogComponent>);

  closeDialog(): void {
    this.dialogRef.close();
  }
}
