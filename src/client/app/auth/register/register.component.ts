import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '@app/core';
import { Department } from '@app/department/department';
import { Faculty } from '@app/faculty/faculty';
import { DepartmentService } from '@app/department/department.service';
import { FacultyService } from '@app/faculty/faculty.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnChanges {
  registerForm: FormGroup;
  departments: Department[];
  faculties: Faculty[];
  errors: string;

  constructor(private fb: FormBuilder, private auth: AuthService,
    private deptService: DepartmentService,
    private facultyService: FacultyService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      middleName: [''],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],

      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      _type: ['', Validators.required],
      cadetDetail: this.fb.group({
        cadetId: ['', Validators.required],
        RC: ['', Validators.required],
        squad: ['', Validators.required],
      }),
      staffDetail: this.fb.group({
        staffId: ['', Validators.required],
        position: [''],
        qualifications: ['']
      }),

      department: ['', Validators.required],
      faculty: ['', Validators.required]
    });
    this.facultyService.getAll().subscribe(
      resp => this.faculties = resp,
      error => this.errors = error
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const value = this.registerForm.get('faculty').value;
    this.deptService.getWith(value).subscribe(
      resp => this.departments = resp,
      error => this.errors = error
    );
  }

  onSubmit() {
    this.auth.register(this.registerForm.value);
  }
}
