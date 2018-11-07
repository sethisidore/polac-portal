import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-cadet-list',
  templateUrl: './cadet-list.component.html',
  styleUrls: ['./cadet-list.component.scss']
})
export class CadetListComponent implements OnInit {
  cadets: Observable<User[]>;
  selectedId: User['profile']['cadetId'];

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.cadets = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = params.get('cadetId');
        return this.userService.getAllCadets();
      })
    );
  }

}
