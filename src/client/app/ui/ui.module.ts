import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutComponent
  ],
  exports: [LayoutComponent]
})
export class UiModule {
  constructor(@Optional() @SkipSelf() parentModule?: UiModule) {
    if (parentModule) {
      throw new Error('UiModule is already loaded. Import it in the AppModule only.');
    }
  }
}
