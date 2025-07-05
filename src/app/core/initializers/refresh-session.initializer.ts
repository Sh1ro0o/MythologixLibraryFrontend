import { tap, catchError, of } from "rxjs";
import { AuthService } from "../../services/auth.service";

export function refreshSessionInitializer(authService: AuthService) {
  return () =>
    authService.refreshSession().pipe(
      tap((res) => {
        authService.setIsLoggedIn(true);
        authService.setRoles(res.data?.roles ?? []);
      }),
      catchError(() => of(null)) //Prevent app from crashing if refresh fails
    );
}