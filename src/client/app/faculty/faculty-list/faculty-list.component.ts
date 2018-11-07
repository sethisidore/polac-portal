import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Faculty } from '../faculty';
import { FacultyService } from '../faculty.service';

@Component({
  selector: 'app-faculty-list',
  templateUrl: './faculty-list.component.html',
  styleUrls: ['./faculty-list.component.scss']
})
export class FacultyListComponent implements OnInit {
  faculties: Observable<Faculty[]>;
  selectedId: Faculty['facultyId'];

  constructor(private facultyService: FacultyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.faculties = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = params.get('facultyId');
        return this.facultyService.getAll();
      })
    );
  }

}
