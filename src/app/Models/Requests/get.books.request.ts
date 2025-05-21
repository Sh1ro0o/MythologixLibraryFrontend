export class GetBooksRequest {
    recordId?: number;
    title?: string;
    publishDate?: Date;
    ISBN?: string;
    includeAuthors?: boolean;
    includeGenres?: boolean;
    
    pageNumber?: number;
    pageSize?: number;
}