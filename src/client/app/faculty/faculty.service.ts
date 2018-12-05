import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Faculty } from './faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  facultyUrl = 'api/faculty';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.facultyUrl);
  }

  getOne(id: Faculty['facultyId']): Observable<Faculty> {
    return this.http.get<Faculty>(`${this.facultyUrl}/${id}`);
  }

  deleteOne(id: Faculty['facultyId']): Observable<Faculty> {
    return this.http.delete<Faculty>(`${this.facultyUrl}/${id}`);
  }

  updateOne(id: Faculty['facultyId'], body: Faculty) {
    return this.http.put<Faculty>(`${this.facultyUrl}/${id}`, body, this.httpOptions);
  }

  createOne(body: Faculty) {
    return this.http.post<Faculty>(this.facultyUrl, body, this.httpOptions);
  }

  createMany() {}

  deleteMany() {}

  updateMany() {}
}
