import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = '/api/users';

  constructor(private http: HttpClient) { }
  // TODO: refactor functions to make it reuseable by other public functions
  private request(method: 'post'|'get'|'put', type: 'cadet'|'staff', userId?: User['profile']['staffId'] |
  User['profile']['cadetId'], user?: any): Observable<any> {
    let base: Observable<any>;
    if (method === 'post') {
      base = this.http.post<any>(`${this.userUrl}/${type}`, user);
    } else if (method === 'put') {
      base = this.http.put<any>(`${this.userUrl}/${type}/${userId}`, user);
    } else {
      base = this.http.get<any>(`${this.userUrl}/${type}/${userId}`);
    }
    const request = base.pipe(map((data: any) => {
      return data;
    })).pipe(
      catchError(this.handleError)
    );
    return request;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      // Unsuccessful response from backend was received
      console.error(`backend returned code ${error.status}\n body was: ${error.error}`);
    }
    return throwError('Something bad happened, Please try again later');
  }

  getAllCadets(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/user/cadet`);
  }

  getOneCadet(id): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/user/cadet/${id}`);
  }

  getAllStaffs(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/user/staff`);
  }

  getOneStaff(id): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/user/staff/${id}`);
  }

}
