import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Course, CourseOfferings } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseUrl = 'api/course';

  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getWith(criteria: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.courseUrl}/${criteria}`);
  }

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseUrl);
  }

  getOne(id): Observable<Course> {
    return this.http.get<Course>(`${this.courseUrl}/${id}`);
  }

  deleteOne(id) {
    return this.http.delete<Course>(`${this.courseUrl}/${id}`);
  }

  updateOne(id: Course['courseId'], body: Course) {
    return this.http.put<Course>(`${this.courseUrl}/${id}`, body, this.httpOptions);
  }

  createOne(data: Course) {
    return this.http.post<Course>(this.courseUrl, data, this.httpOptions);
  }

  createMany() {}

  deleteMany() {}

  updateMany() {}

  offerCourse(data: CourseOfferings) {
    return this.http.post<CourseOfferings>(`${this.courseUrl}/registry`, data, this.httpOptions);
  }
}
