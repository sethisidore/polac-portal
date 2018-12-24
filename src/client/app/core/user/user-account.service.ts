import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@app/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  accountUrl = 'api/account';

  constructor(private http: HttpClient) { }

  getProfile (): Observable<User> {
    return this.http.get<User>(this.accountUrl);
  }

  saveProfileOnEdit(body: User) {}

}
