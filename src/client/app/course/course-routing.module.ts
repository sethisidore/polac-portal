import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

const courseRoutes: Routes = [
  {path: '',
  component: CourseListComponent,
  children: [
    { path: ':courseId', component: CourseDetailComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(courseRoutes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
