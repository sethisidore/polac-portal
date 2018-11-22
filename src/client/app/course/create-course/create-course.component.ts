import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { User } from '@app/user/user';
import { CourseService } from '../course.service';
import { DepartmentService } from '@app/department/department.service';
import { UserService } from '@app/user/user.service';
import { Department } from '@app/department/department';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {
  courseForm: FormGroup;
  departments: Department[];
  staffs: User[];

  constructor(private fb: FormBuilder,
    private courseService: CourseService,
    private deptService: DepartmentService,
    private userService: UserService) { }

  ngOnInit() {
    this.courseForm = this.fb.group({
      courseId: ['', Validators.required],
      title: ['', Validators.required],
      creditLoad: ['', Validators.required],
      level: ['', Validators.required],
      semester: ['', Validators.required],
      department: [''],
      assignedTo: ['']
    });

    this.deptService.getAll().subscribe((deptResponse) => {
      this.departments = deptResponse;
    });

    this.userService.getAllStaffs().subscribe((userResponse) => {
      this.staffs = userResponse;
    });
  }

  onSubmit() {
    this.courseService.createOne(this.courseForm.value).subscribe();
  }
}
