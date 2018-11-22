import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CreateCourseComponent } from './create-course/create-course.component';

@NgModule({
  imports: [
    CommonModule,
    CourseRoutingModule,
    SharedModule
  ],
  declarations: [CourseListComponent, CourseDetailComponent, CreateCourseComponent]
})
export class CourseModule { }
