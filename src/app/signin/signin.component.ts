import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  passwordText: string;
  correctPassword: string;
  message: string;


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.correctPassword = 'zgk39a';
  }

  enterPassword() {
    if (this.passwordText === this.correctPassword) {
      this.setSession();
      // navigate to home or to route saved in local storage
      const route = this.routeInLocal();
      console.log(route);
      if (route === undefined || route === null) {
        this.router.navigate(['/home']);
      } else {
        localStorage.removeItem('route');
        this.router.navigate([route]);
      }
    } else {
      this.passwordText = '';
      this.message = 'Incorrect password, please try again';
    }
  }

  routeInLocal(): string {
    return localStorage.getItem('route');
  }

  setSession() {
    const expiresAt = moment().add(1, 'hour');

    localStorage.setItem('id_token', 'loggedIn');
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()) );
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }


}
