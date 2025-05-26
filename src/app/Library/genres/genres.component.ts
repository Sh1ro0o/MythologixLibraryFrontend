import { Component, DestroyRef, ViewChild } from '@angular/core';
import { GenreData } from '../../Models/data/genre-data';
import { GetGenresRequest } from '../../Models/Requests/get.genres.request';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { withLoading } from '../../core/operators/with-loading.operator';
import { ResponseData } from '../../Models/Responses/response-data';
import { LibraryService } from '../../services/library.service';
import { LoadingService } from '../../services/loading.service';
import { FormControl } from '@angular/forms';
import { FilterData } from '../../Models/data/filter-data';
import { FilterTypeEnum } from '../../shared/Enums/filter-type.enum';

@Component({
  selector: 'app-genres',
  standalone: false,
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.scss'
})
export class GenresComponent {
  //data
  genres: GenreData[] = [];
  genresFilterData!: FilterData[];
  genresRequest: GetGenresRequest = new GetGenresRequest();

  //angular material table data
  genresDataSource: MatTableDataSource<GenreData, MatPaginator> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'description'];

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
    //Fetch data
    this.getGenreData();

    //Filter initialization
    this.genresFilterData = this.initializeFilters();
  }

  getGenreData() {
    //update pagination
    this.genresRequest.pageNumber = this.pageIndex + 1;
    this.genresRequest.pageSize = this.pageSize;

    this.libraryService.getGenres(this.genresRequest).pipe(
      withLoading(this.loadingService),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (genresData: ResponseData<GenreData[]>) => {
        if (genresData.data) {
          //Assign data
          this.genres = genresData?.data;
          this.genresDataSource.data = genresData.data;

          //total pages length
          this.length = genresData.totalCount ?? 0;

          //descending/ascending filtering
          this.genresDataSource.sort = this.sort;
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
    this.getGenreData();
  }

  //filtering
  filterDataEvent(filterData: FilterData[]) {
    filterData.forEach(filter => {
      switch(filter.name) {
        case('Name'):
          this.genresRequest.name = filter.control.value;
          break;

        case('Description'):
          this.genresRequest.description = filter.control.value;
          break;
      }
    });

    //refresh data
    this.getGenreData();
  }

  private initializeFilters(): FilterData[] {
    return [
      new FilterData('Name', new FormControl(''), FilterTypeEnum.String),
      new FilterData('Description', new FormControl(''), FilterTypeEnum.String)
    ];
  }
}
