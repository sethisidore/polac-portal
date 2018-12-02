import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'account', loadChildren: './account/account.module#AccountModule' },
  { path: 'course', loadChildren: './course/course.module#CourseModule' },
  { path: 'department', loadChildren: './department/department.module#DepartmentModule' },
  { path: 'faculty', loadChildren: './faculty/faculty.module#FacultyModule' },
  { path: 'suggesstions', component: HomeComponent },
  { path: '', loadChildren: './auth/auth.module#AuthModule' },
  { path: '', loadChildren: './user/user.module#UserModule' },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
