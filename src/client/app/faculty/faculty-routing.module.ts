import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { FacultyDetailComponent } from './faculty-detail/faculty-detail.component';

const routes: Routes = [{
  path: '',
  component: FacultyListComponent,
  children: [
    { path: ':facultyId', component: FacultyDetailComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacultyRoutingModule { }
