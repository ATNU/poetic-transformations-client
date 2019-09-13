import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spine-index',
  templateUrl: './spine-index.component.html',
  styleUrls: ['./spine-index.component.scss']
})
export class SpineIndexComponent implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }
linesList: string[] = [];
linesWithTextList: any[] = [];


  ngOnInit() {

  }

  getMatchingLines() {
    // get list of lines
      this.dataService.getSpineIndex().then(lines => {
        this.linesList.push(lines);

    // for each line get text and add to list
        const lineArr = this.linesList.toString().split(',');
        for (const lineID of lineArr) {
      this.dataService.getLine(lineID).then(line => {
        const text = line[0]._;
        const lineWithText = {lineID, text };
        this.linesWithTextList.push(lineWithText);
      });
    }
  });

}

}

