import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-view-parent-list',
  templateUrl: './view-parent-list.component.html',
  styleUrls: ['./view-parent-list.component.scss']
})
export class ViewParentListComponent implements OnInit {

  indexList: [{}];
  searchText: string;
  constructor(
    private dataService: DataService,
    private router: Router ) {

  }

  ngOnInit() {
    // call data service to get the parent index
    this.dataService.getIndexList().then(index => {
      this.indexList = index;
      console.log(this.indexList);
    });
  }

  // use angular router to progress to versions page, passing the clicked ID as parameter
  routeVersions(id: string) {
    if (this.isLoggedIn()) {
      this.router.navigate(['/versions/' + id]);
    } else {
      localStorage.setItem('route', '/versions/' + id);
      this.router.navigate(['signin']);
    }
  }

  public doSearch() {
    console.log(this.searchText);
    if (this.isLoggedIn()) {
      this.router.navigate(['/search/' + this.searchText]);
    } else {
      localStorage.setItem('route', '/search/' + this.searchText);
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


