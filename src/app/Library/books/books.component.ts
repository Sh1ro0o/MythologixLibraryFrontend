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
import { FilterData } from '../../Models/data/filter-data';
import { FormControl } from '@angular/forms';
import { FilterTypeEnum } from '../../shared/Enums/filter-type.enum';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  //data
  books: BookData[] = [];
  booksFilterData!: FilterData[];

  //angular material table data
  booksDataSource: MatTableDataSource<BookData, MatPaginator> = new MatTableDataSource();
  displayedColumns: string[] = ['title', 'isbn', 'authors', 'genres', 'description'];

  booksRequest: GetBooksRequest = new GetBooksRequest();

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

    this.booksFilterData = this.initializeFilters();
  }

  getBookData() {
    this.booksRequest.pageNumber = this.pageIndex + 1;
    this.booksRequest.pageSize = this.pageSize;

    this.libraryService.getBooks(this.booksRequest).pipe(
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

  //filtering
  filterDataEvent(filterData: FilterData[]) {
    filterData.forEach(filter => {
      switch(filter.name) {
        case('Title'):
          this.booksRequest.title = filter.control.value;
          break;

        case('ISBN'):
          this.booksRequest.ISBN = filter.control.value;
          break;

        case('Description'):
          this.booksRequest.description = filter.control.value;
          break;
      }
    });

    //refresh data
    this.getBookData();
  }

  private initializeFilters(): FilterData[] {
    return [
      new FilterData('Title', new FormControl(), FilterTypeEnum.String),
      new FilterData('ISBN', new FormControl(), FilterTypeEnum.String),
      new FilterData('Description', new FormControl(), FilterTypeEnum.String),
    ];
  }
}
