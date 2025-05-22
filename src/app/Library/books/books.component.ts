import { AfterViewInit, Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { BookData } from '../../Models/data/book-data';
import { LibraryService } from '../../services/library.service';
import { withLoading } from '../../core/operators/with-loading.operator';
import { LoadingService } from '../../services/loading.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GetBooksRequest } from '../../Models/Requests/get.books.request';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthorData } from '../../Models/data/author-data';
import { GenreData } from '../../Models/data/genre-data';
import { ResponseData } from '../../Models/Responses/response-data';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  //data
  books: BookData[] = [];
  //angular material table data
  booksDataSource: MatTableDataSource<BookData, MatPaginator> = new MatTableDataSource();
  displayedColumns: string[] = ['title', 'isbn', 'authors', 'genres', 'description'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //paginator
  pageSize = 5;
  pageIndex = 0;
  length = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];

  constructor(
    private libraryService: LibraryService,
    private loadingService: LoadingService,
    private destroyRef: DestroyRef,
  ) { }

  ngOnInit(): void {
    this.getBookData();
  }

  getBookData() {
    let getBookRequest = new GetBooksRequest();
    getBookRequest.pageNumber = this.pageIndex + 1;
    getBookRequest.pageSize = this.pageSize;

    this.libraryService.getBooks(getBookRequest).pipe(
      withLoading(this.loadingService),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (booksData: ResponseData<BookData[]>) => {
        if (booksData.data) {
          //Assign data
          this.books = booksData?.data;
          this.booksDataSource = new MatTableDataSource(booksData.data);

          //total pages length
          this.length = booksData.totalCount ?? 0;

          //descending/ascending filtering
          this.booksDataSource.sort = this.sort;
        }
      },
      error: (err) => {
        //this.loginMessage = err?.error?.message || 'Log in failed. Please contact our support for help.';
      }
    });
  }

  getAuthors(authors: AuthorData[]) {
    return authors.map(author => `${author.firstName} ${author.lastName}`).join(', ');
  }

  getGenres(genres: GenreData[]) {
    return genres.map(genre => genre.name).join(', ');
  }

  //pagination
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    //get data based on new pages
    this.getBookData();
  }
}
