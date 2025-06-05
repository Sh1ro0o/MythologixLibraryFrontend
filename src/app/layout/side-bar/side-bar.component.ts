import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../../shared/constants/routes';
import { TreeNodeData } from '../../Models/data/tree-node-data';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit {
  navTreeData: TreeNodeData[] = NAV_DATA_USER;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isAdmin()) {
      this.navTreeData = NAV_DATA_ADMIN;
    }
    else {
      this.navTreeData = NAV_DATA_USER;
    }
  }
}

const NAV_DATA_USER: TreeNodeData[] = [
  {
    name: 'Library',
    icon: 'menu_book',
    children: [
      {
        name: 'Books',
        icon: 'library_books',
        route: ROUTES.BOOKS
      },
      {
        name: 'Authors',
        icon: 'badge',
        route: ROUTES.AUTHORS
      },
      {
        name: 'Genres',
        icon: 'lists',
        route: ROUTES.GENRES
      },
      {
        name: 'Book Copies',
        icon: 'book_5',
        route: ROUTES.BOOKCOPIES
      }
    ]
  },
  {
    name: 'Activity',
    icon: 'pending_actions',
    children: [
      {
        name: 'Borrowed',
        icon: 'swipe_right_alt',
        route: ROUTES.BORROWED
      },
      {
        name: 'Returned',
        icon: 'swipe_left_alt',
        route: ROUTES.RETURNED
      },
      {
        name: 'Overdue',
        icon: 'priority_high',
        route: ROUTES.OVERDUE,
      },
    ],
  },
];

const NAV_DATA_ADMIN: TreeNodeData[] = [
  {
    name: 'Library',
    icon: 'menu_book',
    children: [
      {
        name: 'Books',
        icon: 'library_books',
        route: ROUTES.BOOKS
      },
      {
        name: 'Authors',
        icon: 'badge',
        route: ROUTES.AUTHORS
      },
      {
        name: 'Genres',
        icon: 'lists',
        route: ROUTES.GENRES
      },
      {
        name: 'Book Copies',
        icon: 'book_5',
        route: ROUTES.BOOKCOPIES
      }
    ]
  },
  {
    name: 'Activity',
    icon: 'pending_actions',
    children: [
      {
        name: 'Borrowed',
        icon: 'swipe_right_alt',
        route: ROUTES.BORROWED
      },
      {
        name: 'Returned',
        icon: 'swipe_left_alt',
        route: ROUTES.RETURNED
      },
      {
        name: 'Overdue',
        icon: 'priority_high',
        route: ROUTES.OVERDUE,
      },
    ],
  },
  {
    name: 'Users',
    icon: 'person',
    route: ROUTES.USERS
  }
];