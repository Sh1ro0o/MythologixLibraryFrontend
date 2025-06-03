import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersComponent } from '../../../admin/users/users.component';
import { UserData } from '../../../Models/data/user-data';
import { BookCopyComponent } from '../../../Library/book-copy/book-copy.component';
import { BookCopyData } from '../../../Models/data/book-copy-data';

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
  selectedBookCopy?: BookCopyData;

  addBorrowingTransactionGroup!: FormGroup;

  ngOnInit(): void {
    this.addBorrowingTransactionGroup = this.fb.group({
      dueDate: ['', Validators.required],
      bookCopyId: [{value: '', disabled: true}, Validators.required],
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

  openBookCopiesDialog() {
    const bookCopiesDialogRef = this.dialog.open(BookCopyComponent, {
      width: '80vw',
      maxWidth: '100vw',
      height: '80vh'
    });

    bookCopiesDialogRef.afterClosed().subscribe((resBookCopy: BookCopyData | null) => {
      if (resBookCopy) {
        this.selectedBookCopy = resBookCopy;
        this.addBorrowingTransactionGroup.get('bookCopyId')?.setValue(this.selectedBookCopy.bookId);
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
