import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../shared/constants/routes';


@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  routes = ROUTES;

  constructor() { }

  ngOnInit(): void {

  }
}
