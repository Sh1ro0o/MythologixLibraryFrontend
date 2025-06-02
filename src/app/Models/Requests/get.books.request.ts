export class GetBooksRequest {
    recordId?: number;
    title?: string;
    publishDate?: Date;
    ISBN?: string;
    description?: string;
    includeAuthors?: boolean; //default true in backend, set explicitly if needed
    includeGenres?: boolean; //default true in backend, set explicitly if needed

    authorIds?: number[];
    genreIds?: number[];
    
    pageNumber?: number;
    pageSize?: number;
}