import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewParentListComponent } from './view-parent-list/view-parent-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule,  MatSortModule, MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { VersionListComponent } from './version-list/version-list.component';
import { ViewPoemComponent } from './view-poem/view-poem.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CompareComponent } from './compare/compare.component';
import { FormsModule } from '@angular/forms';
import { SearchResultsComponent } from './search-results/search-results.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewParentListComponent,
    VersionListComponent,
    ViewPoemComponent,
    CompareComponent,
    SearchResultsComponent,
    AboutComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    PdfViewerModule
  ],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
