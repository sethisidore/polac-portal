import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {
  staffs: Observable<User[]>;
  selectedId: User['profile']['staffId'];

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.staffs = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = params.get('staffId');
        return this.userService.getAllStaffs();
      })
    );
  }
}
