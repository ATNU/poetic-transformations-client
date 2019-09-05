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

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router  ) {

  }

  totalPages: number;
  page = 1;
  isLoaded = false;

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.id = params.get('id');
    });

    this.dataService.getDocument(this.id).then(poem => {
      this.poemDoc = poem;
    });

    this.pdfSrc = '../../assets/' + this.id + '.pdf';

  }

  nextPage() {
    this.page += 1;
  }

  previousPage() {
    this.page -= 1;
  }

  afterLoadComplete(pdfData: any) {

    this.totalPages = pdfData.numPages;
    this.isLoaded = true;


    }

}
