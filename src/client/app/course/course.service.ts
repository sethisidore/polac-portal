import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseUrl = 'api/course';

  constructor(private http: HttpClient) { }

  private request(method: 'post'|'get'|'delete'|'put', courseId?: Course['courseId'],
  course?: Course): Observable<Course> {
    let base: Observable<Course>;
    if (method === 'post') {
      base = this.http.post<Course>(`${this.courseUrl}`, course);
    } else if (method === 'delete') {
      base = this.http.delete<Course>(`${this.courseUrl}/${courseId}`);
    } else if (method === 'put') {
      base = this.http.put<Course>(`${this.courseUrl}/${courseId}`, course);
    } else {
      base = this.http.get<Course>(`${this.courseUrl}/${courseId}`);
    }
    const request = base.pipe(map((data: Course) => {
      return data;
    }));
    return request;
  }

  private requestMany(method: 'post'|'get'|'put'|'delete', course?: Course[]): Observable<Course[]> {
    let base: Observable<Course[]>;
    if (method === 'post') {
      base = this.http.post<Course[]>(`${this.courseUrl}/createMany`, course);
    } else if (method === 'put') {
      base = this.http.put<Course[]>(`${this.courseUrl}/updateMany`, course);
    } else if (method === 'delete') {
      base = this.http.delete<Course[]>(`${this.courseUrl}/deleteMany`);
    } else {
      base = this.http.get<Course[]>(`${this.courseUrl}`);
    }
    const request = base.pipe(map((data: Course[]) => {
      return data;
    }));
    return request;
  }

  getAll(): Observable<Course[]> {
    return this.requestMany('get');
  }

  getOne(id): Observable<Course> {
    return this.request('get', id);
  }

  deleteOne(id) {
    return this.request('delete', id);
  }

  updateOne(id: Course['courseId'], body: Course) {
    return this.request('put', id, body);
  }

  createOne(data: Course) {
    return this.request('post', null, data);
  }

  createMany() {}

  deleteMany() {}

  updateMany() {}
}
