import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CadetListComponent } from './cadet-list/cadet-list.component';
import { CadetDetailComponent } from './cadet-detail/cadet-detail.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [CadetListComponent, CadetDetailComponent, StaffListComponent, StaffDetailComponent]
})
export class UserModule { }
