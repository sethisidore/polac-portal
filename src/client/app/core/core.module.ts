import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { SpinnerModule } from './spinner/spinner.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { AuthService } from './auth/auth.service';
import { ExceptionService } from './exception/exception.service';
import { LoggerService } from './logger/logger.service';
import { SpinnerInterceptorService } from './spinner/spinner-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  declarations: [FooterComponent, HeaderComponent],
  providers: [
    AuthService,
    ExceptionService,
    LoggerService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true }
  ],
  exports: [HeaderComponent, FooterComponent, SpinnerModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
