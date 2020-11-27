import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  private chave = "6f33ee1551154d5bb70665c2bf773216";
  private caminhoPadrao = "https://newsapi.org/v2";
  
  constructor(public http:HttpClient) { }

  public getNews(page:number = 1)
  {
    let noticias=`${this.caminhoPadrao}/Everything?q=games&apiKey=${this.chave}&page=${page}&language=pt`;
    return this.http.get(noticias);
  }
}
