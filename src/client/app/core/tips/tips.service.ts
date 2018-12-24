import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipsService {
  tipsUrl = 'api/tips';

  constructor(private http: HttpClient) { }

  saveOne(body: Tips): Observable<Tips> {
    return this.http.post<Tips>(this.tipsUrl, body);
  }

  getAll(): Observable<Tips[]> {
    return this.http.get<Tips[]>(this.tipsUrl);
  }

  getOne(id: Tips['tipsId']): Observable<Tips> {
    return this.http.get<Tips>(`${this.tipsUrl}/${id}`);
  }

  removeTip(id: Tips['tipsId']): Observable<Tips> {
    return this.http.delete<Tips>(`${this.tipsUrl}/${id}`);
  }
}

export interface Tips {
  tipsId?: string;
  email: string;
  subject: string;
  suggestion: string;
}
