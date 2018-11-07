import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
    /*this.subscription = this.loader.spinnerState.pipe(
      debounce(() => timer(1000)),
      takeWhile((res) => res.show <= true),
    )
    .subscribe((state: SpinnerState) => {
      this.show = state.show;
    });*/
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
