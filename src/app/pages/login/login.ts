import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../auth/auth-service';
import { LoginCredentials } from '../../models/auth';
import { NotificationService } from '../../shared/notification/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const credentials = this.loginForm.getRawValue() as LoginCredentials;

    this.authService
      .login(credentials)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: () => {
          this.loginForm.reset();
          this.notificationService.success('Inicio de sesión exitoso.');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error al iniciar sesión', error);
          this.loginForm.setErrors({ incorrect: true });
          this.loginForm.get('password')?.setErrors({ incorrect: true });
          this.loginForm.get('email')?.setErrors({ incorrect: true });
          const message =
            error?.error?.message ?? 'No pudimos iniciar sesión. Revisa tus credenciales.';
          this.notificationService.error(message);
        },
      });
  }
}