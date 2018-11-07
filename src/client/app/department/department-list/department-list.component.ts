import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Department } from '../department';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  departments: Observable<Department[]>;
  selectedId: Department['deptId'];

  constructor(private deptService: DepartmentService) { }

  ngOnInit() {
    this.deptService.getAll().subscribe()
  }

}
