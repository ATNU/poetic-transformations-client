import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.scss']
})
export class VersionListComponent implements OnInit {
  id: string;
  versionList: any;
  compareList: string[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router  ) {
  }


  ngOnInit() {
    // get poem ID from URL
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    // use ID to call versions from server via dataservice
    this.dataService.getVersions(this.id).then(versions => {
      this.versionList = versions;
    });
  }

  // function called on button click
  // use angular router to progress to view poem
  routeView(id: string) {
    if (this.isLoggedIn()) {
      this.router.navigate(['/view-poem/' + id]);
    } else {
      localStorage.setItem('route', '/view-poem/' + id);
      this.router.navigate(['signin']);
    }
  }

  // function called on button click
  // adds to list of piems to compare, shouldn't duplicate
  addToCompare(filename: string) {
    if (!this.compareList.includes(filename)) {
      this.compareList.push(filename);
    }
  }

  // function called on button click
  // button to progress to compare page
  // param string of list of poem filenames to compare
  comparePoems() {
    if (this.compareList.length > 0 ) {
      this.router.navigate(['/compare/' + this.compareList]);
    }
  }

  goToLink(url: string) {
    window.open(url, '_blank');
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
