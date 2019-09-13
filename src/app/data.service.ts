declare var require: any;
import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  indexList: any;
  versionList: any;
  searchResults: any;

  constructor(private http: HttpClient) {
  }

  // server calls, return promise to component, component awaits response
  // response in xml, passed to parseXML function
  public getIndexList(): Promise<any> {
    const re = /\:/gi;
    return this.http.get(environment.apiBaseURL + '/index', { headers: new HttpHeaders()
      .set('Content-Type', 'text/xml'), responseType: 'text', observe: 'response'})
      .toPromise()
      .then((response) => this.parseXml(response.body.replace(re, ''), 'text')
      )
      .catch(this.handleError);
  }

  // takes the XML and the path to the path through the object we want to return
  public parseXml(xmlStr: string, path: string) {
    console.log(xmlStr);
    let result;
    let parser = require('xml2js');
    parser.Parser().parseString(xmlStr, (e, r) => {result = r; });
    console.log(result.existresult);
    return result.existresult[path];
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  public getVersions(selectedPoem: string): Promise<any> {
    console.log('get versions');
    const re = /\:/gi;
    return this.http.get(environment.apiBaseURL + '/index/' + selectedPoem, { headers: new HttpHeaders()
      .set('Content-Type', 'text/xml'), responseType: 'text', observe: 'response'})
      .toPromise()
      .then((response) => this.parseXml(response.body.replace(re, ''), 'version')
      )
      .catch(this.handleError);
  }

  // Search function, XML parsed into JSON object for UI to use
  search(searchText: string) {
    const urlSearchText = encodeURI(searchText);
    console.log(urlSearchText);
    const re = /\:/gi;
    return this.http.get(environment.apiBaseURL + '/search/"' + urlSearchText + '"', { headers: new HttpHeaders()
      .set('Content-Type', 'text/xml'), responseType: 'text', observe: 'response'})
      .toPromise()
      .then((response) => this.parseXml(response.body.replace(re, ''), 'text')
      )
      .catch(this.handleError);
  }

  // DOM parsing needed here as we want the TEI document in HTML not a JSON object
  public getDocument(selectedVersion: string): Promise<any> {
    console.log(selectedVersion);
    const fileName = selectedVersion + '.xml';
    console.log(fileName);
    return this.http.get(environment.apiBaseURL + '/doc/' + fileName, { headers: new HttpHeaders()
      .set('Content-Type', 'application/json'), responseType: 'text', observe: 'response'})
      .toPromise()
      .then((response) => this.parseDom(response.body)
      )
      .catch(this.handleError);
  }

    // takes the XML and the path to the path through the object we want to return
    public parseDom(Str: string) {
      let result;
      const re = /\:/gi;
      const DomParser = require('dom-parser');
      const domparser = new DomParser();
      const StrToParse = Str.replace(re, '');
      result = domparser.parseFromString(StrToParse, 'application.xml');
      console.log(result);
      return result.rawHTML;
    }

    public getSpineIndex() {
      return this.http.get(environment.apiBaseURL + '/spine?lineID=M1.20', { headers: new HttpHeaders()
          .set('Content-Type', 'text/json'), responseType: 'json', observe: 'response'})
        .toPromise()
        .then((response) => response.body  )
        .catch(this.handleError);
    }

    public getLine(lineID: string) {
    console.log('getLine URL reached, lineID=' + lineID);
      const re = /\:/gi;
      return this.http.get(environment.apiBaseURL + '/line?lineID=' + lineID, { headers: new HttpHeaders()
          .set('Content-Type', 'text/xml'), responseType: 'text', observe: 'response'})
        .toPromise()
        .then((response) => this.parseXml(response.body.replace(re, ''), 'l')
         )
        .catch(this.handleError);
    }

    public getSimilarity(file1: string, file2: string) {
      return this.http.get(environment.apiBaseURL + '/comp?one=' + file1 + '.xml&two=' + file2 + '.xml', { headers: new HttpHeaders()
          .set('Content-Type', 'application/json'), responseType: 'text', observe: 'response'})
        .toPromise()
        .then((response) => response.body)
        .catch(this.handleError);
    }
}
