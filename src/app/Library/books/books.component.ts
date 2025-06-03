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
import { GetGenresRequest } from '../../Models/Requests/get.genres.request';
import { CustomKeyValue } from '../../Models/data/key-value';
import { forkJoin, Observable } from 'rxjs';
import { GetAuthorsRequest } from '../../Models/Requests/get.authors.request';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss'
})
export class BooksComponent implements OnInit {
  //data
  books: BookData[] = [];
  genres: GenreData[] = [];
  authors: AuthorData[] = [];
  booksFilterData: FilterData[] = [];

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
    public loadingService: LoadingService,
    private destroyRef: DestroyRef,
  ) { }

  ngOnInit(): void {
    //main data GET
    this.getBookData();
    
    //filtering GET
    forkJoin({
      genresRes: this.getGenresData(),
      authorsRes: this.getAuthorsData()
    }).subscribe(({ genresRes, authorsRes }) => {
      if (genresRes.data) {
        this.genres = genresRes.data;
      }
      if (authorsRes.data) {
        this.authors = authorsRes.data;
      }

      //initialize filters
      this.booksFilterData = this.initializeFilters();
    });
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
          this.booksDataSource.data = booksData.data;

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

  getGenresData(): Observable<ResponseData<GenreData[]>> {
    const genresRequest = new GetGenresRequest();

    return this.libraryService.getGenres(genresRequest).pipe(
      withLoading(this.loadingService),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  getAuthorsData(): Observable<ResponseData<AuthorData[]>> {
    const authorsRequest = new GetAuthorsRequest();

    return this.libraryService.getAuthors(authorsRequest).pipe(
      withLoading(this.loadingService),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  getAuthorsNames(authors: AuthorData[]) {
    return authors.map(author => `${author.firstName} ${author.lastName}`).join(', ');
  }

  getGenresNames(genres: GenreData[]) {
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
          this.booksRequest.title = filter.control.value as string;
          break;

        case('ISBN'):
          this.booksRequest.ISBN = filter.control.value as string;
          break;

        case('Description'):
          this.booksRequest.description = filter.control.value as string;
          break;

        case('Genre'):
          const genreIds = filter.control.value as CustomKeyValue[];

          this.booksRequest.genreIds = genreIds?.map(customKeyValue => +customKeyValue.key);
          break;

        case('Author'):
          const authorIds = filter.control.value as CustomKeyValue[];
          
          this.booksRequest.authorIds = authorIds.map(customKeyValue => +customKeyValue.key);
          break;
      }
    });

    //refresh data
    this.setTableToFirstPage();
    this.getBookData();
  }

  private initializeFilters(): FilterData[] {
    let newFilterData: FilterData[] = [
      new FilterData('Title', new FormControl(), FilterTypeEnum.String),
      new FilterData('ISBN', new FormControl(), FilterTypeEnum.String),
      new FilterData('Description', new FormControl(), FilterTypeEnum.String),
    ];
    
    //Genres filter setup
    const genresKeyValues: CustomKeyValue[] = [];
    this.genres.forEach(genre => {
      genresKeyValues.push(new CustomKeyValue(genre.recordId.toString(), genre.name ?? ''))
    });
    newFilterData.push(new FilterData('Genre', new FormControl(), FilterTypeEnum.Checkbox, genresKeyValues))

    //Authors filter setup
    const authorsKeyValues: CustomKeyValue[] = [];
    this.authors.forEach(author => {
      authorsKeyValues.push(new CustomKeyValue(author.recordId.toString(), `${author.firstName} ${author.lastName}`))
    });
    newFilterData.push(new FilterData('Author', new FormControl(), FilterTypeEnum.Checkbox, authorsKeyValues))

    return newFilterData;
  }

  private setTableToFirstPage(): void {
    this.pageIndex = 0;
  }
}
