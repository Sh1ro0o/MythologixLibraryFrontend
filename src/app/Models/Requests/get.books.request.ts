export class GetBooksRequest {
    recordId?: number;
    title?: string;
    publishDate?: Date;
    ISBN?: string;
    description?: string;
    includeAuthors?: boolean;
    includeGenres?: boolean;

    authorIds?: number[];
    genreIds?: number[];
    
    pageNumber?: number;
    pageSize?: number;
}