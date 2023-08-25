import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '@services/token.service';
import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class RedirectGuard implements CanActivate {
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return true;
//   }

// }

export const RedirectGuard: CanActivateFn = () => {
  const token : string | unknown = inject(TokenService).getToken();
  if(token) {
    inject(Router).navigate(['/app'])
  }
  return true
}
