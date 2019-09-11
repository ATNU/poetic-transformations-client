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

      for (let filename of this.filesToCompare) {
        this.dataService.getDocument(filename).then(poem => {
          this.poemXMLToCompare.push(poem);
        });

      }

      });


  }

}
