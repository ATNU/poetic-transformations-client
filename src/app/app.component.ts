import { Component } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as moment from 'moment';

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
    if (this.isLoggedIn()) {
      this.router.navigate(['home']);
    } else {
      localStorage.setItem('route', 'home');
      this.router.navigate(['signin']);
    }
  }

  aboutClicked() {
    if (this.isLoggedIn()) {
      console.log('logged in');
      this.router.navigate(['about']);
    } else {
      localStorage.setItem('route', 'about');
      this.router.navigate(['signin']);
    }
  }

  detailsClicked() {
    if (this.isLoggedIn()) {
      this.router.navigate(['details']);
    }
    else {
      localStorage.setItem('route', 'details');
      this.router.navigate(['signin']);
    }
  }

  spineClicked() {
    if (this.isLoggedIn()) {
      this.router.navigate(['spine-index']);
    } else {
      localStorage.setItem('route', 'spine-index');
      this.router.navigate(['signin']);
    }
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
