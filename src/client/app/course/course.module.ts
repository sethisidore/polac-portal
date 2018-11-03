import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

@NgModule({
  imports: [
    CommonModule,
    CourseRoutingModule
  ],
  declarations: [CourseListComponent, CourseDetailComponent]
})
export class CourseModule { }
