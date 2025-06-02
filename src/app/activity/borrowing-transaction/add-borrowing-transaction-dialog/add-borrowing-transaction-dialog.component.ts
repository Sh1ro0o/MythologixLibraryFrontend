import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersComponent } from '../../../admin/users/users.component';
import { UserData } from '../../../Models/data/user-data';

@Component({
  selector: 'app-add-borrowing-transaction-dialog',
  standalone: false,
  templateUrl: './add-borrowing-transaction-dialog.component.html',
  styleUrl: './add-borrowing-transaction-dialog.component.scss'
})
export class AddBorrowingTransactionDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddBorrowingTransactionDialogComponent>);
  readonly fb = inject(FormBuilder);
  readonly dialog = inject(MatDialog);

  selectedUser?: UserData;

  addBorrowingTransactionGroup!: FormGroup;

  ngOnInit(): void {
    this.addBorrowingTransactionGroup = this.fb.group({
      dueDate: ['', Validators.required],
      bookCopyId: ['', Validators.required],
      userId: [{value: '', disabled: true}, Validators.required]
    });
  }

  openUserDialog() {
    const usersDialogRef = this.dialog.open(UsersComponent, {
      width: '80vw',
      maxWidth: '100vw',
      height: '80vh'
    });

    usersDialogRef.afterClosed().subscribe((resUser: UserData | null) => {
      if (resUser) {
        this.selectedUser = resUser;
        this.addBorrowingTransactionGroup.get('userId')?.setValue(this.selectedUser.id);
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    //return data to add
  }
}
