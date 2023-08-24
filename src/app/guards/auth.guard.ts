import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '@services/token.service';
import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })

// export class AuthGuard implements CanActivate {

//   constructor(private tokenService:TokenService, private router: Router){

//   }

//   canActivate(): boolean {
//     const token = this.tokenService.getToken();
//     if(!token) {
//       this.router.navigate(['/login']);
//       return false
//     }
//     return true;
//   }

// }

export const authGuard: CanActivateFn = () => {
  const token: string | unknown = inject(TokenService).getToken();
  if (!token) {
    inject(Router).navigate(['/login']);
    return false;
  }
  return true;
};
