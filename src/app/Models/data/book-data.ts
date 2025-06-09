import { AuthorData } from "./author-data";
import { GenreData } from "./genre-data";

export interface BookData {
    recordId?: number;
    title?: string;
    publishDate?: Date;
    isbn?: string;
    description?: string;
    authors?: AuthorData[];
    genres?: GenreData[];
}