import { Component, HostListener, OnInit } from '@angular/core';
import { ROUTES } from '../shared/constants/routes';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  routes = ROUTES;
  sidenavMode: 'over' | 'side' = 'side';
  sidenavOpened: boolean = true;

  constructor(private localStorage: LocalStorageService,
              private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  onLogout() {
    this.localStorage.clear();
    this.router.navigate([this.routes.LOGIN]);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setSidenavMode(event.target.innerWidth);
  }

  setSidenavMode(width: number): void {
    if (width < 828) {
      this.sidenavMode = 'over';
      this.sidenavOpened = false;
    } else {
      this.sidenavMode = 'side';
      this.sidenavOpened = true;
    }
  }
}
