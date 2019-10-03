import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-poem',
  templateUrl: './view-poem.component.html',
  styleUrls: ['./view-poem.component.scss']
})
export class ViewPoemComponent implements OnInit {
  id: string;
  poemDoc: any;
  imagePath: string;
  pdfSrc: string;
  htmlList: any;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router  ) {

  }

  totalPages: number;
  page = 1;

  ngOnInit() {
    // get parameter from URL
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
    });

    // call data service to get document from server and split into pages
    this.dataService.getDocument(this.id).then(poem => {
      this.htmlList = poem.split('<span class="pb">');
      console.log('this.htmllist');
      console.log(this.htmlList);
      this.poemDoc = poem;
    });

    this.pdfSrc = '../../assets/' + this.id + '.pdf';

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
