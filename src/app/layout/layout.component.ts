import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { ROUTES } from '../shared/constants/routes';


@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  routes = ROUTES;

  constructor(private router: Router,
              private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.loading$.subscribe({
      next: (isLoading) => {
        console.log(isLoading);
      }
    })

    this.loadingService.hide();
  }
}
