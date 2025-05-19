import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../../Models/Requests/login.request';
import { AuthService } from '../../../services/auth.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { LocalStorageKey } from '../../../shared/Enums/local-storage-key.enum';
import { LoginResponse } from '../../../Models/Responses/login.response';
import { Router } from '@angular/router';
import { LoadingService } from '../../../services/loading.service';
import { withLoading } from '../../../core/operators/with-loading.operator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ROUTES } from '../../../shared/constants/routes';

@Component({
  selector: 'app-log-in',
  standalone: false,
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  isPasswordVisible: boolean = false;

  loginFailed: boolean = false;
  loginMessage: string = '';

  routes = ROUTES;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private router: Router,
    public loadingService: LoadingService,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      let loginRequest: LoginRequest = new LoginRequest();
      loginRequest.email = this.loginForm.get('email')?.value;
      loginRequest.password = this.loginForm.get('password')?.value;

      //Log in
      this.authService.login(loginRequest).pipe(
        withLoading(this.loadingService),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (response: LoginResponse) => {
          //store token data in local storage
          this.localStorage.set(LocalStorageKey.Token, response?.data?.token);
          this.localStorage.set(LocalStorageKey.Expiration, response?.data?.expiresOn);

          //redirect to dashbouard
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.loginFailed = true;
          this.loginMessage = err?.error?.message || 'Log in failed. Please contact our support for help.';
        }
      });
    }
    else {
      console.log('form not submitted');
      this.loginForm.markAllAsTouched();
    }
  }

  onShowOrHidePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
