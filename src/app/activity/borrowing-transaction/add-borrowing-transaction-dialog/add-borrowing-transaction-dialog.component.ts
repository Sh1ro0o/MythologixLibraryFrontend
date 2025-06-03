import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersComponent } from '../../../admin/users/users.component';
import { UserData } from '../../../Models/data/user-data';
import { BookCopyComponent } from '../../../Library/book-copy/book-copy.component';
import { BookCopyData } from '../../../Models/data/book-copy-data';
import { PostBorrowingTransactionRequest } from '../../../Models/Requests/post.borrowing-transaction.request';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-add-borrowing-transaction-dialog',
  standalone: false,
  templateUrl: './add-borrowing-transaction-dialog.component.html',
  styleUrl: './add-borrowing-transaction-dialog.component.scss'
})
export class AddBorrowingTransactionDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddBorrowingTransactionDialogComponent>);
  readonly loadingService = inject(LoadingService);
  readonly fb = inject(FormBuilder);
  readonly dialog = inject(MatDialog);

  selectedUser?: UserData;
  selectedBookCopy?: BookCopyData;

  addBorrowingTransactionGroup!: FormGroup;
  isMissingFilledFields: boolean = false;

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
    if (this.addBorrowingTransactionGroup.valid) {
      const dueDate = this.addBorrowingTransactionGroup.get('dueDate')?.value;
      const bookCopyId = this.addBorrowingTransactionGroup.get('bookCopyId')?.value;
      const userId = this.addBorrowingTransactionGroup.get('userId')?.value;

      const postRequest: PostBorrowingTransactionRequest = new PostBorrowingTransactionRequest(dueDate, bookCopyId, userId);

      console.log(postRequest);

      //this.dialogRef.close();
    }
    else {
      this.isMissingFilledFields = true;
      this.addBorrowingTransactionGroup.markAllAsTouched();
    }
  }
}
