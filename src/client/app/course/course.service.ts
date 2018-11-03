import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Course } from './course';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  private request(method: 'post'|'getAll'|'get'|'delete'|'put', courseId?: Course['courseId'],
  course?: Course): Observable<Course|Course[]> {
    let base: Observable<any>;
    if (method === 'post') {
      base = this.http.post(`${this.baseUrl}/course`, course);
    } else if (method === 'delete') {
      base = this.http.delete(`${this.baseUrl}/course/${courseId}`);
    } else if (method === 'put') {
      base = this.http.put(`${this.baseUrl}/course/${courseId}`, course);
    } else if (method === 'get') {
      base = this.http.get<Course>(`${this.baseUrl}/course/${courseId}`);
    } else {
      base = this.http.get<Course[]>(`${this.baseUrl}/course`);
    }
    const request = base.pipe(map((data: Course|Course[]) => {
      return data;
    }));
    return request;
  }

  getAll(): Observable<Course|Course[]> {
    return this.request('getAll');
  }

  getOne(id): Observable<Course|Course[]> {
    return this.request('get');
  }

  deleteOne(id) {}

  updateOne(id) {}

  createOne(data: Course) {
    return this.request('post', null, data);
  }

  createMany() {}

  deleteMany() {}

}
