import { Component } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private location: Location) { }

  title = 'poetry-client';

  backClicked() {
    this.location.back();
  }
}
