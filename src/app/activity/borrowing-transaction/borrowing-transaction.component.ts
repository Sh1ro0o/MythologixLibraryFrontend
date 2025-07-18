import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetBorrowingTransactionRequest } from '../../Models/Requests/get.borrowing-transaction.request';
import { BorrowingStatus } from '../../shared/enums/borrowing-status.enum';
import { ActivityService } from '../../services/activity.service';
import { withLoading } from '../../core/operators/with-loading.operator';
import { LoadingService } from '../../services/loading.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResponseData } from '../../Models/Responses/response-data';
import { BorrowingTransactionData } from '../../Models/data/borrowing-transaction-data';
import { MatSort } from '@angular/material/sort';
import { FilterData } from '../../Models/data/filter-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { FilterTypeEnum } from '../../shared/enums/filter-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { AddBorrowingTransactionDialogComponent } from './add-borrowing-transaction-dialog/add-borrowing-transaction-dialog.component';
import { AlertDialogComponent } from '../../shared/components/alert-dialog/alert-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-borrowing-transaction',
  standalone: false,
  templateUrl: './borrowing-transaction.component.html',
  styleUrl: './borrowing-transaction.component.scss'
})
export class BorrowingTransactionComponent implements OnInit {
  //data
  borrowingTransactions: BorrowingTransactionData[] = [];
  borrowingFilterData: FilterData[] = [];

  //angular material table data
  borrowingDataSource: MatTableDataSource<BorrowingTransactionData, MatPaginator> = new MatTableDataSource();
  displayedColumns: string[] = ['bookCopySerialNumber' ,'userEmail', 'borrowDate', 'dueDate', 'returnedDate'];

  borrowingTransactionRequest: GetBorrowingTransactionRequest = new GetBorrowingTransactionRequest();
  title: string = 'BORROWED';
  isAdmin: boolean = false;

  @ViewChild(MatSort) sort!: MatSort;

  //paginator
  pageSize = 5;
  pageIndex = 0;
  length = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
    public loadingService: LoadingService,
    public authService: AuthService,
    private destroyRef: DestroyRef,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    const status = this.route.snapshot.data['status'];

    switch (status) {
    case BorrowingStatus.borrowed:
      this.borrowingTransactionRequest.isReturned = false;
      this.title = 'BORROWED';
      break;
    case BorrowingStatus.returned:
      this.borrowingTransactionRequest.isReturned = true;
      this.title = 'RETURNED';
      break;
    case BorrowingStatus.overdue:
      this.borrowingTransactionRequest.isReturned = false;
      this.borrowingTransactionRequest.dueDate = new Date().toISOString();
      this.title = 'OVERDUE';
      break;
    }

    //main data GET
    this.getBorrowingTransactions();

    //initialize filters
    this.initializeFilters();
  }

  getBorrowingTransactions(): void {
    this.borrowingTransactionRequest.pageNumber = this.pageIndex + 1;
    this.borrowingTransactionRequest.pageSize = this.pageSize;

    this.activityService.getBorrowingTransctions(this.borrowingTransactionRequest).pipe(
      withLoading(this.loadingService),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (borrowingTransactionData: ResponseData<BorrowingTransactionData[]>) => {
        if (borrowingTransactionData.data) {
          //Assign data
          this.borrowingTransactions = borrowingTransactionData?.data;
          this.borrowingDataSource.data = borrowingTransactionData.data;

          //total pages length
          this.length = borrowingTransactionData.totalCount ?? 0;

          //descending/ascending filtering
          this.borrowingDataSource.sort = this.sort;
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

  addBorrowingTransaction() {
    const addDialogRef = this.dialog.open(AddBorrowingTransactionDialogComponent, {
      width: '50vw',
      maxWidth: '100vw',
      height: '50vh'
    });

    //on successful add we push the newly created borrowingTransaction to our table
    addDialogRef.afterClosed().subscribe({
      next: (borrowingTransaction: BorrowingTransactionData | null) => {
        if(borrowingTransaction) {
          this.getBorrowingTransactions();
        }
      }
    })
  }

  //pagination
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    //get data based on new pages
    this.getBorrowingTransactions();
  }

  //filtering
  filterDataEvent(filterData: FilterData[]) {
    //TODO: FINISH IMPLEMENTATION

    //refresh data
    this.setTableToFirstPage();
    this.getBorrowingTransactions();
  }

  private initializeFilters(): FilterData[] {
    let newFilterData: FilterData[] = [
      new FilterData('UserEmail', new FormControl(), FilterTypeEnum.String),
      new FilterData('BorrowDate', new FormControl(), FilterTypeEnum.Date),
      new FilterData('DueDate', new FormControl(), FilterTypeEnum.Date),
      new FilterData('ReturnedDate', new FormControl(), FilterTypeEnum.Date),
    ];

    return newFilterData;
  }

  private setTableToFirstPage(): void {
    this.pageIndex = 0;
  }
}
