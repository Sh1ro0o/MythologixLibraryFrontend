import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BooksComponent } from "./books/books.component";
import { AuthorsComponent } from "./authors/authors.component";

const libraryRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'books',
        pathMatch: 'full',
      },
      {
        path: 'books', 
        component: BooksComponent 
      },
      {
        path: 'authors', 
        component: AuthorsComponent 
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(libraryRoutes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule {}