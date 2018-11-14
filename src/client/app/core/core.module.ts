import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AuthService } from './auth/auth.service';
import { ExceptionService } from './exception/exception.service';
import { LoggerService } from './logger/logger.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Nano-Xsrf',
    }),
    ReactiveFormsModule
  ],
  declarations: [],
  providers: [
    AuthService,
    ExceptionService,
    LoggerService,
  ],
  exports: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}
