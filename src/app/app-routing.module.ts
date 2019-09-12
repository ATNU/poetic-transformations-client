import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VersionListComponent } from './version-list/version-list.component';
import { ViewParentListComponent } from './view-parent-list/view-parent-list.component';
import { ViewPoemComponent } from './view-poem/view-poem.component';
import { CompareComponent } from './compare/compare.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import {AboutComponent} from './about/about.component';
import {DetailsComponent} from './details/details.component';
import {SpineIndexComponent} from './spine-index/spine-index.component';

const routes: Routes = [
  {path: 'home', component: ViewParentListComponent},
  {path: 'versions/:id', component: VersionListComponent},
  {path: 'view-poem/:id', component: ViewPoemComponent},
  {path: 'compare/:compareList', component: CompareComponent},
  {path: 'search/:searchText', component: SearchResultsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'details', component: DetailsComponent},
  {path: 'spine-index', component: SpineIndexComponent},
  {path: '',  redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
