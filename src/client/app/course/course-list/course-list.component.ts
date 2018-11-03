import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit, OnDestroy {
  courses: Observable<Course|Course[]>; // TODO: make it that it only observes for arrays
  selectedId: Course['courseId'];

  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.courses = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = params.get('courseId');
        return this.courseService.getAll();
      })
    );
  }

  ngOnDestroy() {}

}
