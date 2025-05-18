import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from '../Services/loading.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

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
