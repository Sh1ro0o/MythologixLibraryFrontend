import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { containsNonAlphanumeric } from '../../../Validators/contains-non-alphanumeric.validators';
import { containsUppercase } from '../../../Validators/contains-upper-case.validators';
import { containsLowercase } from '../../../Validators/contains-lower-case.validators';
import { containsDigit } from '../../../Validators/contains-digit.validators';
import { stringsMatchValidator } from '../../../Validators/strings-match.validators';
import { ROUTES } from '../../../shared/constants/routes';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup
  isPasswordVisible: boolean = false;

  routes = ROUTES;
  
  constructor(private fb: FormBuilder) { }

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
      console.log('submitted', this.registerForm.value);
    }
    else {
      console.log('form not submitted');
      this.registerForm.markAllAsTouched();
    }
  }

  onShowOrHidePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
