declare var require: any;
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  indexList: any;
  versionList: any;
  searchResults: any;


  constructor(private http: HttpClient) {

  }
/*
  getIndexList() {
    this.http.get(environment.apiBaseURL + '/index', { headers: new HttpHeaders()
      .set('Content-Type', 'text/xml'), responseType: 'text', observe: 'response'}).subscribe( res => {
      console.log(res.body);
      this.indexList = res.body;
      return this.indexList;
    });
  }*/


  // sending over XML
  public getIndexList(): Promise<any> {
    const re = /\:/gi;
    let parseString = require('xml2js').parseString;
    return this.http.get(environment.apiBaseURL + '/index', { headers: new HttpHeaders()
      .set('Content-Type', 'text/xml'), responseType: 'text', observe: 'response'})
        .toPromise()
        .then((response) => this.parseParentXml(response.body.replace(re, ''))
        )
        .catch(this.handleError);
  }

  public parseParentXml(xmlStr) {
    var result;
    var parser = require('xml2js');
    parser.Parser().parseString(xmlStr, (e, r) => {result = r});
    return result.existresult.text;
}

private handleError(error: any): Promise<any> {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
}
/*
  getVersions(selectedPoem: string) {
    this.http.get(environment.apiBaseURL + '/index/' + selectedPoem, { headers: new HttpHeaders()
      .set('Content-Type', 'text/xml'), responseType: 'text', observe: 'response'}).subscribe( res => {
      console.log(res.body);
      this.versionList = res.body; });
  }*/


  public getVersions(selectedPoem: string): Promise<any> {
    console.log('get versions');
    const re = /\:/gi;
    let parseString = require('xml2js').parseString;
    return this.http.get(environment.apiBaseURL + '/index/' + selectedPoem, { headers: new HttpHeaders()
      .set('Content-Type', 'text/xml'), responseType: 'text', observe: 'response'})
        .toPromise()
        .then((response) => this.parseXml(response.body.replace(re, ''))
        )
        .catch(this.handleError);
  }

  public parseXml(xmlStr) {
    var result;
    var parser = require('xml2js');
    parser.Parser().parseString(xmlStr, (e, r) => {result = r});

    return result.existresult.version;
}


  search(searchText: string) {
    const urlSearchText = encodeURI(searchText);
    console.log(urlSearchText);
    this.http.get(environment.apiBaseURL + '/search/"' + urlSearchText + '"', { headers: new HttpHeaders()
      .set('Content-Type', 'text/xml'), responseType: 'text', observe: 'response'}).subscribe( res => {
        console.log('search');
        console.log(res.body);
        this.searchResults = res.body; });
  }


  public getDocument(selectedVersion: string): Promise<any> {
    console.log(selectedVersion);
    const fileName = encodeURI(selectedVersion + '.xml');
    console.log(fileName);
    return this.http.get(environment.apiBaseURL + '/doc/' + fileName, { headers: new HttpHeaders()
      .set('Content-Type', 'text/xml'), responseType: 'text', observe: 'response'})
        .toPromise()
        .then((response) => response.body
        )
        .catch(this.handleError);
  }


}
