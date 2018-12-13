import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FacultyRoutingModule } from './faculty-routing.module';
import { FacultyListComponent } from './faculty-list/faculty-list.component';
import { FacultyDetailComponent } from './faculty-detail/faculty-detail.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FacultyRoutingModule
  ],
  declarations: [FacultyListComponent, FacultyDetailComponent]
})
export class FacultyModule { }
