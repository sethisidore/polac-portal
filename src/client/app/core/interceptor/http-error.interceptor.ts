import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        retry(2),
        catchError((error: HttpErrorResponse) => {
          let eMessage: string;
          if (error.error instanceof ErrorEvent) { // Client-Side Errors
            eMessage = `Error: ${error.error.message}`;
          } else {
            if (!navigator.onLine) { // Connection Errors
              eMessage = 'No Internet Connection';
            } else if (error.status >= 200) {
              eMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
          }
          return throwError(eMessage);
        })
      );
  }
}
