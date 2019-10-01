import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spine-index',
  templateUrl: './spine-index.component.html',
  styleUrls: ['./spine-index.component.scss']
})
export class SpineIndexComponent implements OnInit {
CSVFile: string;
page = 1;
totalPages: number;
example: boolean;
PDF: boolean;

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }
linesList: string[] = [];
linesWithTextList: any[] = [];


  ngOnInit() {
this.CSVFile = '../../assets/SpineIndexCSV.pdf';
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

viewExample()
{
  this.PDF = false;
  this.example = true;
  }

viewPDF()
{
  this.PDF = true;
  this.example = false;
}

// pdf handling
  nextPage() {
    this.page += 1;
  }

  previousPage() {
    this.page -= 1;
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
  }

}

