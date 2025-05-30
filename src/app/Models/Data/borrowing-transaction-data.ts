export interface BorrowingTransactionData {
  recordId?: number;
  borrowDate?: Date;
  dueDate?: Date;
  returnedDate?: Date;
  isReturned?: boolean;
  createdDate?: Date;
  modifiedDate?: Date;

  // User
  userId?: string;
  userEmail?: string;

  // BookCopy
  bookCopyId?: number;
  bookCopySerialNumber?: string;
}