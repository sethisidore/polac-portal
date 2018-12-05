import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  cadetUrl = 'api/cadet';
  staffUrl = 'api/staff';

  constructor(private http: HttpClient) { }

  getAllCadets(): Observable<User[]> {
    return this.http.get<User[]>(`${this.cadetUrl}`);
  }

  getCadetsWith(criteria: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.cadetUrl}?${criteria}`);
  }

  getOneCadet(id: string): Observable<User> {
    return this.http.get<User>(`${this.cadetUrl}?${id}`);
  }

  getAllStaffs(): Observable<User[]> {
    return this.http.get<User[]>(this.staffUrl);
  }

  getOneStaff(id: string): Observable<User> {
    return this.http.get<User>(`${this.staffUrl}?${id}`);
  }

  getStaffWith(criteria: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.staffUrl}?${criteria}`);
  }
}
