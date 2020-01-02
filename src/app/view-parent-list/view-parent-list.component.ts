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
      this.router.navigate(['/versions/' + id]);
  }

  public doSearch() {
    console.log(this.searchText);
      this.router.navigate(['/search/' + this.searchText]);
  }

}


