import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../auth/auth-service';
import { RegisterCredentials } from '../../models/auth';
import { NotificationService } from '../../shared/notification/notification.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  isSubmitting = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const credentials = this.registerForm.getRawValue() as RegisterCredentials;

    this.authService
      .register(credentials)
      .pipe(
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe({
        next: () => {
          this.registerForm.reset();
          this.notificationService.success('Cuenta creada con éxito.');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Error al registrarse', error);
          this.registerForm.setErrors({ failed: true });
          this.registerForm.get('password')?.setErrors({ failed: true });
          const message =
            error?.error?.message ?? 'No pudimos crear tu cuenta. Inténtalo nuevamente.';
          this.notificationService.error(message);
        },
      });
  }
}

