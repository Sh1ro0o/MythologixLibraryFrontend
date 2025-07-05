import { Component, HostListener, OnInit } from '@angular/core';
import { ROUTES } from '../shared/constants/routes';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


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
  isShrinked: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.setSidenavMode(window.innerWidth);
  }

  onLogout() {
    this.authService.reset();
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
      this.isShrinked = true;
    } else {
      this.sidenavMode = 'side';
      this.sidenavOpened = true;
      this.isShrinked = false;
    }
  }
}
