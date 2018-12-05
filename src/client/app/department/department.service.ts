import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  deptUrl = 'api/department';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getWith(criteria: string): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.deptUrl}/${criteria}`);
  }

  getAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.deptUrl);
  }

  getOne(id: Department['deptId']): Observable<Department> {
    return this.http.get<Department>(`${this.deptUrl}/${id}`);
  }

  deleteOne(id: Department['deptId']) {
    return this.http.delete<Department>(`${this.deptUrl}/${id}`);
  }

  updateOne(id: Department['deptId'], body: Department) {
    return this.http.put<Department>(`${this.deptUrl}/${id}`, body, this.httpOptions);
  }

  createOne(body: Department) {
    return this.http.post<Department>(this.deptUrl, body, this.httpOptions);
  }

  createMany() {}

  deleteMany() {}

  updateMany() {}
}
