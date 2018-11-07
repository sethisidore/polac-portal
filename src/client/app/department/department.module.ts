import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';

@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutingModule
  ],
  declarations: [DepartmentListComponent, DepartmentDetailComponent]
})
export class DepartmentModule { }
