import { CanActivateFn, Route, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
export const usermanagerGuard: CanActivateFn = (state) => {
  // const router=new Router;
  const router = inject(Router);
  const username = localStorage.getItem('loggedInUser');
  if (username) {
    return true;
  }

  return router.navigate(['']);
};

export function usernameExists() {}
