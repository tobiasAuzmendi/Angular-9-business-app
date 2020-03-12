import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// tslint:disable-next-line:max-line-length
const API_TOKEN = `JLt48hqsfzYTOT6j1hmzlkhsfXuIjfpQYNOjiw-nYe8zn51lCX8KRZCE5D-392dPGDVdx1TehOBQs8EgSaLqrUERA0bDBnFu5neBKK9A35Jh7jIavzj4qj5cs17NXXYx`;

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${API_TOKEN}`
      }
    });

    return next.handle(req);
  }
}
