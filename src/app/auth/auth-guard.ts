import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('Auth Guard: Acceso permitido.');
    return true;
  } 
  
  console.log('Auth Guard: Acceso denegado. Redirigiendo a /login.');
  return router.createUrlTree(['/login']);
};
