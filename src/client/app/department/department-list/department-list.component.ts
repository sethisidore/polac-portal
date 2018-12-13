import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Department } from '../department';
import { DepartmentService } from '../department.service';
import { User } from '@app/user/user';
import { UserService } from '@app/user/user.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  departments: Observable<Department[]>;
  selectedId: Department['deptId'];
  deptForm: FormGroup;
  lecturers: User[];
  errResponse: string;

  constructor(private deptService: DepartmentService,
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.departments = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = params.get('courseId');
        return this.deptService.getAll();
      })
    );

    this.deptForm = this.fb.group({
      deptId: ['', Validators.required],
      name: ['', Validators.required],
      headOfDepartment: [''],
      accreditation: this.fb.group({
        status: [''],
        date: ['']
      })
    });

    this.userService.getAllStaffs().subscribe((resp: User[]) => {
      this.lecturers = resp;
    }, (error) => {
      this.errResponse = error.message;
    });
  }

  onSubmit() {
    this.deptService.createOne(this.deptForm.value)
      .subscribe((message) => {}, (error) => {
        this.errResponse = error;
      });
  }

}
