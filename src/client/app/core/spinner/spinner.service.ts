import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { SpinnerState } from './spinner.model';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private subject = new Subject<SpinnerState>();
  spinnerState = this.subject.asObservable();

  constructor() { }

  show() {
    this.subject.next(<SpinnerState>{ show: true });
  }

  hide() {
    this.subject.next(<SpinnerState>{ show: false });
  }
}
