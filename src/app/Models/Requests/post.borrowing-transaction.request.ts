export class PostBorrowingTransactionRequest {
    dueDate: Date;
    userId: number;
    bookCopyId: number;

    constructor(dueDate: Date, userId: number, bookCopyId: number) {
        this.dueDate = dueDate;
        this.userId = userId;
        this.bookCopyId = bookCopyId;
    }
}