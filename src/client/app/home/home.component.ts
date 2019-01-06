import { Component, OnInit } from '@angular/core';

import { TipsService, Tips } from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  suggestion: Tips[];
  errors: string;
  news: string[];

  constructor(private tipService: TipsService) { }

  ngOnInit() {
    this.tipService.getAll().subscribe((resp) => this.suggestion = resp,
    (error) => this.errors = error);
  }

}
