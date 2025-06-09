import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersComponent } from '../../../admin/users/users.component';
import { UserData } from '../../../Models/data/user-data';
import { BookCopyComponent } from '../../../Library/book-copy/book-copy.component';
import { BookCopyData } from '../../../Models/data/book-copy-data';
import { PostBorrowingTransactionRequest } from '../../../Models/Requests/post.borrowing-transaction.request';
import { LoadingService } from '../../../services/loading.service';
import { ActivityService } from '../../../services/activity.service';
import { withLoading } from '../../../core/operators/with-loading.operator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AlertDialogComponent } from '../../../shared/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-add-borrowing-transaction-dialog',
  standalone: false,
  templateUrl: './add-borrowing-transaction-dialog.component.html',
  styleUrl: './add-borrowing-transaction-dialog.component.scss'
})
export class AddBorrowingTransactionDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<AddBorrowingTransactionDialogComponent>);
  readonly loadingService = inject(LoadingService);
  private readonly activityService = inject(ActivityService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);
  private readonly dialog = inject(MatDialog);

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
        this.addBorrowingTransactionGroup.get('bookCopyId')?.setValue(this.selectedBookCopy.recordId);
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

      const postRequest: PostBorrowingTransactionRequest = new PostBorrowingTransactionRequest(dueDate, userId, bookCopyId);
      this.activityService.postBorrowingTransaction(postRequest).pipe(
        withLoading(this.loadingService),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (borrowingTransaction) => {
          this.dialogRef.close(borrowingTransaction);
        },
        error: (err) => {
          this.dialog.open(AlertDialogComponent, {
            data: {
              title: 'Error!',
              content: err?.error?.message ?? err?.error?.title  ?? 'Error occured!',
            }
          });
        }
      });
    }
    else {
      this.isMissingFilledFields = true;
      this.addBorrowingTransactionGroup.markAllAsTouched();
    }
  }
}
