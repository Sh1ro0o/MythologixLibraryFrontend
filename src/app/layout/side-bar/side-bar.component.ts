import { Component } from '@angular/core';
import { ROUTES } from '../../shared/constants/routes';
import { TreeNodeData } from '../../Models/data/tree-node-data';

@Component({
  selector: 'app-side-bar',
  standalone: false,
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  navTreeData: TreeNodeData[] = NAV_DATA;
}

const NAV_DATA: TreeNodeData[] = [
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