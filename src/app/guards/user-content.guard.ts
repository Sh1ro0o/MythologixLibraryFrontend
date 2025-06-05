import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { ROUTES } from "../shared/constants/routes";

@Injectable({
  providedIn: 'root'
})
export class UserContentGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  
	canActivate(): boolean | UrlTree {
    if (!this.authService.isLoggedIn()) {
      return this.router.createUrlTree([ROUTES.LOGIN]);
    }

    return true;
  }
}