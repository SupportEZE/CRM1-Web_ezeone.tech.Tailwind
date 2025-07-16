import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authRedirectGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);

  const userData = cookieService.get('userData');

  // If user is logged in and tries to access login, redirect to product page
  if (userData && (state.url === '/login' || state.url === '/')) {
    router.navigate(['/product-add/1']);
    return false;
  }

  // Allow access to login if not logged in
  return !userData;
};