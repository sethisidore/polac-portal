import { Component, OnInit } from '@angular/core';

import { UserAccountService } from '@app/core';
import { User } from '@app/user/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  errors: string;

  constructor(private accountService: UserAccountService) { }

  ngOnInit() {
    this.accountService.getProfile().subscribe(
      resp => this.user = resp,
      error => this.errors = error);
  }
}
