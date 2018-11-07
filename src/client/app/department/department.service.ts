import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  deptUrl = '/api/department';

  constructor(private http: HttpClient) { }

  private request(method: 'post'|'get'|'delete'|'put', deptId?: Department['deptId'],
  department?: Department): Observable<Department> {
    let base: Observable<any>;
    if (method === 'post') {
      base = this.http.post<Department>(this.deptUrl, department);
    } else if (method === 'delete') {
      base = this.http.delete<Department>(this.deptUrl + `/${deptId}`);
    } else if (method === 'put') {
      base = this.http.put<Department>(this.deptUrl + `/${deptId}`, department);
    } else {
      base = this.http.get<Department>(this.deptUrl + `/${deptId}`);
    }
    const request = base.pipe(map((data: Department) => {
      return data;
    }));
    return request;
  }

  private requestMany(method: 'post'|'get'|'put'|'delete', dept?: Department[]): Observable<Department[]> {
    let base: Observable<Department[]>;
    if (method === 'post') {
      base = this.http.post<Department[]>(this.deptUrl + '/createMany', dept);
    } else if (method === 'put') {
      base = this.http.put<Department[]>(this.deptUrl + '/updateMany', dept);
    } else if (method === 'delete') {
      base = this.http.delete<Department[]>(this.deptUrl + '/deleteMany');
    } else {
      base = this.http.get<Department[]>(this.deptUrl);
    }
    const request = base.pipe(map((data: Department[]) => {
      return data;
    }));
    return request;
  }

  getAll(): Observable<Department[]> {
    return this.requestMany('get');
  }

  getOne(id: Department['deptId']): Observable<Department> {
    return this.request('get', id);
  }

  deleteOne(id: Department['deptId']) {
    return this.request('delete', id);
  }

  updateOne(id: Department['deptId'], body) {
    return this.request('put', id, body);
  }

  createOne(data: Department) {
    return this.request('post', null, data);
  }

  createMany() {}

  deleteMany() {}

  updateMany() {}
}
