import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '@app/core';
import { Department } from '@app/department/department';
import { Faculty } from '@app/faculty/faculty';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  departments: Department[];
  faculties: Faculty[];

  constructor(private fb: FormBuilder, private auth: AuthService) { }

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
      profile: this.fb.group({
        cadetId: [''],
        RC: [''],
        squad: [''],

        staffId: [''],
        position: [''],
        qualifications: ['']
      }),

      department: ['', Validators.required],
      faculty: ['', Validators.required]
    });
  }

  onSubmit() {
    this.auth.register(this.registerForm.value);
  }
}
