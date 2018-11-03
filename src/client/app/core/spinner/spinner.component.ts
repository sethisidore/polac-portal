import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { debounce, takeWhile } from 'rxjs/operators';

import { SpinnerService } from './spinner.service';
import { SpinnerState } from './spinner.model';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;

  constructor(private loader: SpinnerService) { }

  ngOnInit() {
    this.subscription = this.loader.spinnerState.pipe(
      debounce(() => timer(1000)),
      takeWhile((res) => res.show <= true),
    )
    .subscribe((state: SpinnerState) => {
      this.show = state.show;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
