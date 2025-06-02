export class GetBookCopyRequest {
    recordId?: number;
    serialNumber?: string;
    isAvailable?: boolean;
    createdDate?: Date;
    modifiedDate?: Date;
    bookId?: number;

    includeBook?: boolean; //default true in backend, set explicitly if needed

    pageNumber?: number;
    pageSize?: number;
}