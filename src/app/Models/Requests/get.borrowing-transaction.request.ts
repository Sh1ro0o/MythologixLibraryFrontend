export class GetBorrowingTransactionRequest {
	recordId?: number;
	borrowDate?: string;
	dueDate?: string;
	returnedDate?: string;
	isReturned?: boolean;
	createdDate?: string;
	modifiedDate?: string;
	userId?: string;
	bookCopyId?: number;

	includeBookCopy?: boolean; //default true in backend, set explicitly if needed
	includeUser?: boolean;     //default true in backend, set explicitly if needed

	pageNumber?: number;
	pageSize?: number;
}