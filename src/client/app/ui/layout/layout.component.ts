import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TipsService, Tips } from '@app/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  suggestionForm: FormGroup;
  errResponse: string;
  tip: Tips;

  constructor(private fb: FormBuilder, private tipsService: TipsService) {}

  ngOnInit() {
    this.suggestionForm = this.fb.group({
      email: ['', Validators.required],
      subject: ['', Validators.required],
      suggestion: ['', Validators.required]
    });
  }

  onSubmit() {
    this.tipsService.saveOne(this.suggestionForm.value).subscribe(
      (tip) => this.tip = tip,
      (errors) => this.errResponse = errors);
  }
}
