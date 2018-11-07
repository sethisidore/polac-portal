import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadetListComponent } from './cadet-list/cadet-list.component';
import { CadetDetailComponent } from './cadet-detail/cadet-detail.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffDetailComponent } from './staff-detail/staff-detail.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'cadet',
      component: CadetListComponent,
      children: [
        { path: ':cadetId', component: CadetDetailComponent }
      ]
    },
    {
      path: 'staff',
      component: StaffListComponent,
      children: [
        { path: ':staffId', component: StaffDetailComponent }
      ]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
