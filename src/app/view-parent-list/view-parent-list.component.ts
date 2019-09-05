import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

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
    this.dataService.getIndexList().then(index => {
      this.indexList = index;
      console.log(this.indexList);
    });
  }

  routeVersions(id: string) {
    this.router.navigate(['/versions/' + id]);
  }

  public doSearch = (value: string) => {
    // need to add a delay onto this so it waits until the user is no longer typing, or change to a submit button
    const searchTerm = value.trim().toLocaleLowerCase();
    this.dataService.search(searchTerm);
  }

}


