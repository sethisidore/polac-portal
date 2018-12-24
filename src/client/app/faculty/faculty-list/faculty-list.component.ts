import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Faculty } from '../faculty';
import { FacultyService } from '../faculty.service';
import { UserService } from '@app/user/user.service';
import { User } from '@app/user/user';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.scss']
})
export class FacultyListComponent implements OnInit {
  faculties: Observable<Faculty[]>;
  selectedId: Faculty['facultyId'];
  facultyForm: FormGroup;
  lecturers: User[];
  errors: string;

  constructor(private facultyService: FacultyService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.faculties = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = params.get('facultyId');
        return this.facultyService.getAll();
      })
    );

    this.facultyForm = this.fb.group({
      facultyId: ['', Validators.required],
      name: ['', Validators.required],
      dean: [''],
    });
  }

  onOpenFacultyForm() {
    this.userService.getAllStaffs().subscribe((data: User[]) => {
      this.lecturers = data;
    });
  }

  onSubmit() {
    this.facultyService.createOne(this.facultyForm.value).subscribe(
      resp => this.router.navigate(['./', resp.facultyId]),
      error => this.errors = error
    );
  }

}
