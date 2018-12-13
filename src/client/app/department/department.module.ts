import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    SharedModule
  ],
  declarations: [
    DepartmentListComponent,
    DepartmentDetailComponent,
  ]
})
export class DepartmentModule { }
