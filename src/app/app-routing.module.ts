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
import {SigninComponent} from './signin/signin.component';
import {RouteGuardService} from './route-guard.service';


const routes: Routes = [
  {path: 'home', component: ViewParentListComponent, canActivate: [RouteGuardService]},
  {path: 'versions/:id', component: VersionListComponent, canActivate: [RouteGuardService]},
  {path: 'view-poem/:id', component: ViewPoemComponent, canActivate: [RouteGuardService]},
  {path: 'compare/:compareList', component: CompareComponent, canActivate: [RouteGuardService]},
  {path: 'search/:searchText', component: SearchResultsComponent, canActivate: [RouteGuardService]},
  {path: 'about', component: AboutComponent, canActivate: [RouteGuardService]},
  {path: 'details', component: DetailsComponent, canActivate: [RouteGuardService]},
  {path: 'spine-index', component: SpineIndexComponent, canActivate: [RouteGuardService]},
  {path: '',  redirectTo: 'signin', pathMatch: 'full' },
  {path: 'signin', component: SigninComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
