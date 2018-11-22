import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = '/api/users';

  constructor(private http: HttpClient) { }

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
    }));
    return request;
  }

  getAllCadets(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/cadet`);
  }

  getOneCadet(id): Observable<User> {
    return this.request('get', 'cadet', id);
  }

  getAllStaffs(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/staff`);
  }

  getOneStaff(id): Observable<User> {
    return this.request('get', 'staff', id);
  }

}
