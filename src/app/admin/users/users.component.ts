import { Component, DestroyRef, Optional, ViewChild } from '@angular/core';
import { UserData } from '../../Models/data/user-data';
import { FilterData } from '../../Models/data/filter-data';
import { GetUsersRequest } from '../../Models/Requests/get.users.request';
import { AdminService } from '../../services/admin.service';
import { LoadingService } from '../../services/loading.service';
import { withLoading } from '../../core/operators/with-loading.operator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResponseData } from '../../Models/Responses/response-data';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { FilterTypeEnum } from '../../shared/Enums/filter-type.enum';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  //data
  users: UserData[] = [];
  usersFilterData: FilterData[] = [];
  //angular material table data
  usersDataSource: MatTableDataSource<UserData, MatPaginator> = new MatTableDataSource();
  displayedColumns: string[] = ['email', 'id'];
  
  usersRequest: GetUsersRequest = new GetUsersRequest();

  @ViewChild(MatSort) sort!: MatSort;

  //paginator
  pageSize = 5;
  pageIndex = 0;
  length = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];

  constructor(
    private adminService: AdminService,
    public loadingService: LoadingService,
    private destroyRef: DestroyRef,
    @Optional() public dialogRef?: MatDialogRef<UsersComponent>
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.usersFilterData = this.initializeFilters();
  }

  getUserData() {
    this.usersRequest.pageNumber = this.pageIndex + 1;
    this.usersRequest.pageSize = this.pageSize;

    this.adminService.getUsers(this.usersRequest).pipe(
      withLoading(this.loadingService),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (usersData: ResponseData<UserData[]>) => {
        if (usersData.data) {
          //Assign data
          this.users = usersData?.data;
          this.usersDataSource.data = usersData.data;

          //total pages length
          this.length = usersData.totalCount ?? 0;

          //descending/ascending filtering
          this.usersDataSource.sort = this.sort;
        }
      },
      error: (err) => {
        
      }
    });
  }

  //pagination
  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    //get data based on new pages
    this.getUserData();
  }

  //filtering
  filterDataEvent(filterData: FilterData[]) {
    filterData.forEach(filter => {
      switch(filter.name) {
        case('Email'):
          this.usersRequest.email = filter.control.value as string;
          break;
          
        case('Id'):
          this.usersRequest.id = filter.control.value as string;
          break;
      }
    });

    //refresh data
    this.setTableToFirstPage();
    this.getUserData();
  }

  closeDialog(): void {
    this.dialogRef?.close();
  }

  onRowClicked(user: UserData): void {
    this.dialogRef?.close(user);
  }

  private initializeFilters(): FilterData[] {
    return [
      new FilterData('Email', new FormControl(), FilterTypeEnum.String),
      new FilterData('Id', new FormControl(), FilterTypeEnum.String)
    ];
  }

  private setTableToFirstPage(): void {
    this.pageIndex = 0;
  }
}
