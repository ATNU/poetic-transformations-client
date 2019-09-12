import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spine-index',
  templateUrl: './spine-index.component.html',
  styleUrls: ['./spine-index.component.scss']
})
export class SpineIndexComponent implements OnInit {
linesList: any[] = [];

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  public getMatchingLines() {
    this.dataService.getSpineIndex().then(lines => {
      this.linesList.push(lines);
  });
}

}

