import { Component, DestroyRef, Optional, ViewChild } from '@angular/core';
import { BookCopyData } from '../../Models/data/book-copy-data';
import { GetBookCopyRequest } from '../../Models/Requests/get.book-copy.request';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { withLoading } from '../../core/operators/with-loading.operator';
import { FilterData } from '../../Models/data/filter-data';
import { ResponseData } from '../../Models/Responses/response-data';
import { LibraryService } from '../../services/library.service';
import { LoadingService } from '../../services/loading.service';
import { FilterTypeEnum } from '../../shared/enums/filter-type.enum';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-book-copy',
  standalone: false,
  templateUrl: './book-copy.component.html',
  styleUrl: './book-copy.component.scss'
})
export class BookCopyComponent {
  //data
  bookCopies: BookCopyData[] = [];
  bookCopiesFilterData: FilterData[] = [];
  //angular material table data
  bookCopiesDataSource: MatTableDataSource<BookCopyData, MatPaginator> = new MatTableDataSource();
  displayedColumns: string[] = ['recordId' ,'serialNumber', 'bookTitle', 'isAvailable'];
  
  bookCopiesRequest: GetBookCopyRequest = new GetBookCopyRequest();

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
    private dialog: MatDialog,
    @Optional() public dialogRef?: MatDialogRef<BookCopyComponent>
  ) { }

  ngOnInit(): void {
    this.getAuthorData();
    this.bookCopiesFilterData = this.initializeFilters();
  }

  getAuthorData() {
    this.bookCopiesRequest.pageNumber = this.pageIndex + 1;
    this.bookCopiesRequest.pageSize = this.pageSize;

    this.libraryService.getBookCopies(this.bookCopiesRequest).pipe(
      withLoading(this.loadingService),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (bookCopiesData: ResponseData<BookCopyData[]>) => {
        if (bookCopiesData.data) {
          //Assign data
          this.bookCopies = bookCopiesData?.data;
          this.bookCopiesDataSource.data = bookCopiesData.data;

          //total pages length
          this.length = bookCopiesData.totalCount ?? 0;

          //descending/ascending filtering
          this.bookCopiesDataSource.sort = this.sort;
        }
      },
      error: (err) => {
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: 'Error!',
            content: err?.error?.message ?? err?.error?.title ?? 'Error occured!',
          }
        });
      }
    });
  }

  closeDialog(): void {
    this.dialogRef?.close();
  }

  onRowClicked(bookCopy: BookCopyData): void {
    this.dialogRef?.close(bookCopy);
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
        case('Serial Number'):
          this.bookCopiesRequest.serialNumber = filter.control.value as string;
          break;
      }
    });

    //refresh data
    this.setTableToFirstPage();
    this.getAuthorData();
  }

  private initializeFilters(): FilterData[] {
    return [
      new FilterData('Serial Number', new FormControl(), FilterTypeEnum.String),
    ];
  }

  private setTableToFirstPage(): void {
    this.pageIndex = 0;
  }
}
