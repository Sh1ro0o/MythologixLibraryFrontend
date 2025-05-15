import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  standalone: false,
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  isPasswordVisible: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('submitted', this.loginForm.value);
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
