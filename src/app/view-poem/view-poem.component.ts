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

    // call data service to get document from server
    this.dataService.getDocument(this.id).then(poem => {
      //todo split into a list of pages
      this.htmlList = poem.split('<span class="pb">');
      console.log(this.htmlList[1]);
      this.poemDoc = poem;
    });

    this.pdfSrc = '../../assets/' + this.id + '.pdf';

  }

  // pdf handling
  nextPage() {
    this.page += 1;
    //todo add instruction for html as well
  }

  previousPage() {
    this.page -= 1;
    //todo add instruction for html as well
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    }

}
