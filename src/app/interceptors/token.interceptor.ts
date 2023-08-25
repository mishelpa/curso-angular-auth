import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '@services/token.service';

const CHECK_TOKEN = new HttpContextToken<boolean>(() => false);
export function checkToken() {
  return new HttpContext().set(CHECK_TOKEN, true);
}

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.context.get(CHECK_TOKEN)) {
      return this.addtoken(request, next)
    }
    return next.handle(request);
  }

  private addtoken(request: HttpRequest<unknown>, next: HttpHandler) {
    const access_token = this.tokenService.getToken();
    if(access_token) {
      const authRq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${access_token}`)
      });
      return next.handle(authRq);
    }
    return next.handle(request);
  }
}
