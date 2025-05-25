import { Component, OnInit } from '@angular/core';
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

  constructor(private localStorage: LocalStorageService,
              private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  onLogout() {
    this.localStorage.clear();
    this.router.navigate([this.routes.LOGIN]);
  }
}
