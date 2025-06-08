import { Component, DestroyRef, OnInit } from '@angular/core';
import { ROUTES } from '../shared/constants/routes';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { ActivityService } from '../services/activity.service';
import { SeperateTransactionsCountData } from '../Models/data/seperate-transactions-count-data';
import { GetSeperateTransactionsCountRequest } from '../Models/Requests/get.seperate-transactions-count.request';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { withLoading } from '../core/operators/with-loading.operator';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../shared/components/alert-dialog/alert-dialog.component';
import { ResponseData } from '../Models/Responses/response-data';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  routes = ROUTES;
  isAdmin: boolean = false;
  seperateTransactionsCountData: SeperateTransactionsCountData | undefined = undefined;

  constructor(
    private authService: AuthService,
    private activityService: ActivityService,
    private destroyRef: DestroyRef,
    private dialog: MatDialog,
    public loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();

    let seperateTransactionsCountReq: GetSeperateTransactionsCountRequest = new GetSeperateTransactionsCountRequest();
    if (this.isAdmin)
    {
      seperateTransactionsCountReq.hasBorrowedToday = true;
      seperateTransactionsCountReq.hasReturnedToday = true;
    }

    this.activityService.getSeperateTransactionsCount(seperateTransactionsCountReq).pipe(
      withLoading(this.loadingService),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (seperateTransactionsCountData: ResponseData<SeperateTransactionsCountData>) => {
        this.seperateTransactionsCountData = seperateTransactionsCountData.data;
      },
      error: (err) => {
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: 'Error!',
            content: err?.error?.message ?? err?.error?.title ?? 'Error occured!',
          }
        });
      }
    })
  }
}
