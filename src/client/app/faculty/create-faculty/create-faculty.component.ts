import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '@app/user/user.service';
import { FacultyService } from '../faculty.service';
import { User } from '@app/user/user';

@Component({
  selector: 'app-create-faculty',
  templateUrl: './create-faculty.component.html',
  styleUrls: ['./create-faculty.component.scss']
})
export class CreateFacultyComponent implements OnInit {
  facultyForm: FormGroup;
  lecturers: User[];

  constructor(private fb: FormBuilder, private facultyService: FacultyService,
    private userService: UserService) { }

  ngOnInit() {
    this.facultyForm = this.fb.group({
      facultyId: ['', Validators.required],
      name: ['', Validators.required],
      dean: [''],
    });

    this.userService.getAllStaffs().subscribe((data: User[]) => {
      this.lecturers = data;
    });
  }

  onSubmit() {
    this.facultyService.createOne(this.facultyForm.value).subscribe();
  }
}
