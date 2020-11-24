import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  url = 'http://newsapi.org/v2/';
  apiKey = '6f33ee1551154d5bb70665c2bf773216';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getNews(type: string, q: string, language: string, page: number, pageSize: number) {
    let query = this.url + this.montaFiltro(type, q, language, page, pageSize);
    return this.httpClient.get(query);
  }

  montaFiltro(type: string, q: string, language: string, page: number, pageSize: number): string {
    let filtro: string = "";
    
    if(type && type.length === 0) {
      filtro += "Everything";
    }
    else {
      filtro += type;
    }

    filtro += "?";

    if(q && q.length > 0) {
      filtro += "q=" + q;
      filtro += "&";
    }

    if(language && language.length === 0) {
      filtro += "language=pt&"
    } 
    else {
      filtro += "language=" + language + "&";
    }

    if(page === 0) {
      filtro += "page=1&";
    } 
    else {
      filtro += "page=" + page;
      filtro += "&";
    }

    if(pageSize === 0) {
      filtro += "pageSize=10&";
    } 
    else {
      filtro += "pageSize=" + pageSize;
      filtro += "&";
    }

    filtro += "apiKey=" + this.apiKey;
    return filtro;
  }

}
