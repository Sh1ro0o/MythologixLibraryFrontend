import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { AuthorData } from '../../Models/data/author-data';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookData } from '../../Models/data/book-data';
import { LibraryService } from '../../services/library.service';
import { LoadingService } from '../../services/loading.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { withLoading } from '../../core/operators/with-loading.operator';
import { GetAuthorsRequest } from '../../Models/Requests/get.authors.request';
import { ResponseData } from '../../Models/Responses/response-data';

@Component({
  selector: 'app-authors',
  standalone: false,
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss'
})
export class AuthorsComponent implements OnInit {
  //data
  authors: AuthorData[] = [];
  //angular material table data
  authorsDataSource: MatTableDataSource<BookData, MatPaginator> = new MatTableDataSource();
  displayedColumns: string[] = ['firstName', 'lastName'];

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
    this.getAuthorData();
  }

  getAuthorData() {
    let getAuthorRequest = new GetAuthorsRequest();
    getAuthorRequest.pageNumber = this.pageIndex + 1;
    getAuthorRequest.pageSize = this.pageSize;

    this.libraryService.getAuthors(getAuthorRequest).pipe(
      withLoading(this.loadingService),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (authorsData: ResponseData<AuthorData[]>) => {
        if (authorsData.data) {
          //Assign data
          this.authors = authorsData?.data;
          this.authorsDataSource = new MatTableDataSource(authorsData.data);

          //total pages length
          this.length = authorsData.totalCount ?? 0;

          //descending/ascending filtering
          this.authorsDataSource.sort = this.sort;
        }
      },
      error: (err) => {
        //this.loginMessage = err?.error?.message || 'Log in failed. Please contact our support for help.';
      }
    });
  }

  //pagination
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    //get data based on new pages
    this.getAuthorData();
  }
}
