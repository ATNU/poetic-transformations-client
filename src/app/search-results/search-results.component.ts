import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchText: string;
  resultsList: any;
  resultsFound: boolean;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router ) {
    }

  ngOnInit() {
    // get searchtext from URL
    this.route.paramMap.subscribe(params => {
      this.searchText = params.get('searchText');
      this.doSearch();
    });

  }

  public doSearch() {
    console.log(this.searchText);
    const searchTerm = '*' + this.searchText.trim().toLocaleLowerCase() + '*';
    this.dataService.search(searchTerm).then(result => {
      this.resultsList = result;
      if (result !== undefined) {this.resultsFound = true; } else { this.resultsFound = false; }
      console.log(result);
    });
  }


      // function called on button click
  // use angular router to progress to view poem
  routeView(id: string) {
      this.router.navigate(['/view-poem/' + id]);
  }

}
