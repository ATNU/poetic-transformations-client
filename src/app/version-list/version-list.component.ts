import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-version-list',
  templateUrl: './version-list.component.html',
  styleUrls: ['./version-list.component.scss']
})
export class VersionListComponent implements OnInit {
  id: string;
  versionList: any;
  compareList: string[] = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router  ) {
  }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.dataService.getVersions(this.id).then(versions => {
      this.versionList = versions;
    });
  }

  routeView(id: string) {
    this.router.navigate(['/view-poem/' + id]);
  }

  addToCompare(filename: string) {
    if (!this.compareList.includes(filename)) {
      this.compareList.push(filename);
    }
  }

  comparePoems() {
    if (this.compareList.length > 0 ) {
      this.router.navigate(['/compare/' + this.compareList]);
    }
  }


}
