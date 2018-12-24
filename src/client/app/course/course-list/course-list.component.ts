import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Course } from '../course';
import { CourseService } from '../course.service';
import { UserService } from '@app/user/user.service';
import { DepartmentService } from '@app/department/department.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from '@app/department/department';
import { User } from '@app/user/user';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses: Observable<Course[]>;
  selectedId: Course['courseId'];
  courseForm: FormGroup;
  departments: Department[];
  staffs: User[];
  offerForm: FormGroup;
  errors: string;

  constructor(
    private courseService: CourseService,
    private deptService: DepartmentService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.courses = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = params.get('courseId');
        return this.courseService.getAll();
      })
    );

    this.courseForm = this.fb.group({
      courseId: ['', Validators.required],
      title: ['', Validators.required],
      creditLoad: ['', Validators.required],
      level: ['', Validators.required],
      semester: ['', Validators.required],
      department: [''],
      assignedTo: ['']
    });

    this.offerForm = this.fb.group({
      level: ['', Validators.required],
      session: [`${new Date(Date.now() - 349990897)}/${new Date(Date.now())}`, Validators.required],
      offerings: ['', Validators.required]
    });
  }

  onOpenCourseForm() {
    this.deptService.getAll().subscribe((deptResponse) => {
      this.departments = deptResponse;
    });

    this.userService.getAllStaffs().subscribe((userResponse) => {
      this.staffs = userResponse;
    });
  }

  ngOnDestroy() {}

  onSubmitCourse() {
    this.courseService.createOne(this.courseForm.value).subscribe(
      resp => this.router.navigate(['./', resp.courseId]),
      error => this.errors = error
    );
  }

  onSubmitOffer() {
    this.courseService.offerCourse(this.offerForm.value).subscribe();
  }
}
