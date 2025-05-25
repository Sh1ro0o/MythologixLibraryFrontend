import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BooksComponent } from "./books/books.component";
import { AuthorsComponent } from "./authors/authors.component";
import { GenresComponent } from "./genres/genres.component";

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
      },
      {
        path: 'genres', 
        component: GenresComponent 
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(libraryRoutes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule {}