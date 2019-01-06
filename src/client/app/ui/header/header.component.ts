import { Component, OnInit } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd,
  NavigationError, NavigationStart, Router } from '@angular/router';

import { AuthService } from '@app/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loading = false;
  status: Observable<boolean>;

  constructor(private router: Router, public auth: AuthService) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationEnd:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnInit() {
  }
}
