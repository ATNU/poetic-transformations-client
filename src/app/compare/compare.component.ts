import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  compareList: string;
  filesToCompare: string[] = [];
  poemXMLToCompare: any[] = [];
  twoPoemsSelected: boolean;
similarity: string;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router  ) {}

  ngOnInit() {
    // get string of filenames from URL param
    // split back into array
    // fetch from db via dataservice
    this.route.paramMap.subscribe(params => {
      this.compareList = params.get('compareList');
      this.filesToCompare = this.compareList.split(',');

      if (this.filesToCompare.length === 2) {
        this.twoPoemsSelected = true;

        // calculate similarity as a percentage
        this.dataService.getSimilarity(this.filesToCompare[0], this.filesToCompare[1]).then (decimal => {
          // convert to percentage
          const percent = decimal * 100;
          this.similarity = percent.toString();
        });

      } else { this.twoPoemsSelected = false; }

      for (let filename of this.filesToCompare) {
        this.dataService.getDocument(filename).then(poem => {
          this.poemXMLToCompare.push(poem);
        });

      }

      });


  }

}
