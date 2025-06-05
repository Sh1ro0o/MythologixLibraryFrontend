import { Component, DestroyRef, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { containsNonAlphanumeric } from '../../../Validators/contains-non-alphanumeric.validators';
import { containsUppercase } from '../../../Validators/contains-upper-case.validators';
import { containsLowercase } from '../../../Validators/contains-lower-case.validators';
import { containsDigit } from '../../../Validators/contains-digit.validators';
import { stringsMatchValidator } from '../../../Validators/strings-match.validators';
import { ROUTES } from '../../../shared/constants/routes';
import { RegisterRequest } from '../../../Models/Requests/register.request';
import { LoadingService } from '../../../services/loading.service';
import { AuthService } from '../../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { withLoading } from '../../../core/operators/with-loading.operator';
import { ResponseData } from '../../../Models/Responses/response-data';
import { AuthData } from '../../../Models/data/auth-data';
import { LocalStorageService } from '../../../services/local-storage.service';
import { LocalStorageKey } from '../../../shared/Enums/local-storage-key.enum';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  isPasswordVisible: boolean = false;

  loginFailed: boolean = false;
  loginMessage: string = '';

  routes = ROUTES;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private destroyRef: DestroyRef,
    private localStorage: LocalStorageService,
    private router: Router,
    public loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(24),
        containsNonAlphanumeric(),containsUppercase(), containsLowercase(), containsDigit()]],
      rePassword: ['', [Validators.required]]
    },
    {
      validators: stringsMatchValidator('password', 'rePassword')
    }
  );
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      let registerRequest: RegisterRequest = new RegisterRequest();
      registerRequest.email = this.registerForm.get('email')?.value;
      registerRequest.password = this.registerForm.get('password')?.value;

      this.authService.register(registerRequest).pipe(
        withLoading(this.loadingService),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: (response: ResponseData<AuthData>) => {
          //store token data in local storage
          this.localStorage.set(LocalStorageKey.Token, response?.data?.token);
          this.localStorage.set(LocalStorageKey.Expiration, response?.data?.expiresOn);
          this.localStorage.set(LocalStorageKey.Roles, response?.data?.roles);

          //redirect to dashbouard
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          this.loginFailed = true;
          this.loginMessage = err?.error?.message || 'Register failed. Please contact our support for help.';
        }
      });
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }

  onShowOrHidePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  //Enter key pressed submit form
  @HostListener('window:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent) {
    if(this.registerForm.valid) {
      this.onSubmit();
    }
  }
}
