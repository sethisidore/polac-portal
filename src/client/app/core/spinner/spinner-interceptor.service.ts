import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService {

  constructor(private spinnerService: SpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showSpinner();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.onEnd();
      }
    }, (err: any) => {
      this.onEnd();
    }));
  }

  private onEnd () {
    this.hideSpinner();
  }

  private hideSpinner() {
    this.spinnerService.hide();
  }

  private showSpinner () {
    this.spinnerService.show();
  }
}
