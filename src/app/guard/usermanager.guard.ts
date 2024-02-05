import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const usermanagerGuard: CanActivateFn = (): boolean | Promise<boolean> => {
  const router = inject(Router);
  const username = localStorage.getItem('loggedInUser');
  if (username) {
    return true;
  }
  return router.navigate(['']);
};

export function usernameExists() { }
