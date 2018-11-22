import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DepartmentService } from '../department.service';
import { UserService } from '@app/user/user.service';
import { User } from '@app/user/user';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent implements OnInit {
  deptForm: FormGroup;
  success: string;
  error: string;
  lecturers: User[];

  constructor(private fb: FormBuilder, private deptService: DepartmentService,
    private userService: UserService) { }

  ngOnInit() {
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
      this.error = error.message;
    });
  }

  onSubmit() {
    this.deptService.createOne(this.deptForm.value)
      .subscribe((message) => {}, (err) => {
        this.error = err;
      });
  }
}
