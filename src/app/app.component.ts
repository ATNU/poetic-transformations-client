import { Component } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router ) { }

  title = 'poetry-client';

  backClicked() {
    this.location.back();
  }

  routeHome() {
    this.router.navigate(['home']);
  }

  aboutClicked() {
  this.router.navigate(['about']);
  }

  detailsClicked() {
    this.router.navigate(['details']);
  }
}
