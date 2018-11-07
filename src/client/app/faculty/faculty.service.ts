import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Faculty } from './faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  facultyUrl = 'api/faculty';

  constructor(private http: HttpClient) { }

  private request(method: 'post'|'get'|'delete'|'put', facultyId?: Faculty['facultyId'],
  faculty?: Faculty): Observable<Faculty> {
    let base: Observable<Faculty>;
    if (method === 'post') {
      base = this.http.post<Faculty>(this.facultyUrl, faculty);
    } else if (method === 'delete') {
      base = this.http.delete<Faculty>(`${this.facultyUrl}/${facultyId}`);
    } else if (method === 'put') {
      base = this.http.put<Faculty>(`${this.facultyUrl}/${facultyId}`, faculty);
    } else {
      base = this.http.get<Faculty>(`${this.facultyUrl}/${facultyId}`);
    }
    const request = base.pipe(map((data: Faculty) => {
      return data;
    }));
    return request;
  }

  private requestMany(method: 'post'|'get'|'put'|'delete', dept?: Faculty[]): Observable<Faculty[]> {
    let base: Observable<Faculty[]>;
    if (method === 'post') {
      base = this.http.post<Faculty[]>(`${this.facultyUrl}/createMany`, dept);
    } else if (method === 'put') {
      base = this.http.put<Faculty[]>(`${this.facultyUrl}/updateMany`, dept);
    } else if (method === 'delete') {
      base = this.http.delete<Faculty[]>(`${this.facultyUrl}/deleteMany`);
    } else {
      base = this.http.get<Faculty[]>(`${this.facultyUrl}`);
    }
    const request = base.pipe(map((data: Faculty[]) => {
      return data;
    }));
    return request;
  }

  getAll(): Observable<Faculty[]> {
    return this.requestMany('get');
  }

  getOne(id: Faculty['facultyId']): Observable<Faculty> {
    return this.request('get', id);
  }

  deleteOne(id: Faculty['facultyId']): Observable<Faculty> {
    return this.request('delete', id);
  }

  updateOne(id: Faculty['facultyId'], body: Faculty) {
    return this.request('put', id, body);
  }

  createOne(data: Faculty) {
    return this.request('post', null, data);
  }

  createMany() {}

  deleteMany() {}

  updateMany() {}
}
