export class GetBooksRequest {
    recordId?: number;
    title?: string;
    publishDate?: Date;
    ISBN?: string;
    description?: string;
    includeAuthors?: boolean;
    includeGenres?: boolean;
    
    pageNumber?: number;
    pageSize?: number;
}