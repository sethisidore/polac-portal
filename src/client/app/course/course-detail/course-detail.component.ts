import { Component, OnInit } from '@angular/core';

import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  course: Course;
  errorMessage: string;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getOne(23).subscribe((data: Course) => {
      this.course = data;
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

}
