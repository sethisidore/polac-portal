import { Component } from '@angular/core';
import { SpinnerService } from './core/spinner/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'polac';
  constructor(private spinner: SpinnerService) {
    this.spinner.hide();
  }
}
