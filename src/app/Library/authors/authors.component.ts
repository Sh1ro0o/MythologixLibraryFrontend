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
import { FilterData } from '../../Models/data/filter-data';
import { FormControl } from '@angular/forms';
import { FilterTypeEnum } from '../../shared/Enums/filter-type.enum';

@Component({
  selector: 'app-authors',
  standalone: false,
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss'
})
export class AuthorsComponent implements OnInit {
  //data
  authors: AuthorData[] = [];
  authorsFilterData: FilterData[] = [];
  //angular material table data
  authorsDataSource: MatTableDataSource<AuthorData, MatPaginator> = new MatTableDataSource();
  displayedColumns: string[] = ['firstName', 'lastName'];
  
  authorsRequest: GetAuthorsRequest = new GetAuthorsRequest();

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
    this.authorsFilterData = this.initializeFilters();
  }

  getAuthorData() {
    this.authorsRequest.pageNumber = this.pageIndex + 1;
    this.authorsRequest.pageSize = this.pageSize;

    this.libraryService.getAuthors(this.authorsRequest).pipe(
      withLoading(this.loadingService),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (authorsData: ResponseData<AuthorData[]>) => {
        if (authorsData.data) {
          //Assign data
          this.authors = authorsData?.data;
          this.authorsDataSource.data = authorsData.data;

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

  //filtering
  filterDataEvent(filterData: FilterData[]) {
    filterData.forEach(filter => {
      switch(filter.name) {
        case('First Name'):
          this.authorsRequest.firstName = filter.control.value as string;
          break;

        case('Last Name'):
          this.authorsRequest.lastName = filter.control.value as string;
          break;
      }
    });

    //refresh data
    this.getAuthorData();
  }

  private initializeFilters(): FilterData[] {
    return [
      new FilterData('First Name', new FormControl(), FilterTypeEnum.String),
      new FilterData('Last Name', new FormControl(), FilterTypeEnum.String)
    ];
  }
}
