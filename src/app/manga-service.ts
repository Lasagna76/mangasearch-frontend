import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Manga, PageResponse } from './models/manga';
import { Genere } from './models/manga';
import { Observable } from 'rxjs/internal/Observable';
import { Mangasearchrequest, SearchPageRequest } from './models/mangasearchrequest';
import { ReportRequest } from './models/report';

@Injectable({
  providedIn: 'root',
})
export class MangaService {

  private readonly apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  getLatest(): Observable<Manga[]> {
    return this.http.get<Manga[]>(`${this.apiUrl}/manga/latest`)
  }


  getGeneri(): Observable<Genere[]> {
    return this.http.get<Genere[]>(`${this.apiUrl}/generi`)
  }

  search(filters: Mangasearchrequest, pageRequest: SearchPageRequest) {
    const { sortField, sortDirection, ...bodyFilters } = filters;

    let params = new HttpParams()
      .set('page', pageRequest.page)
      .set('size', pageRequest.size);

    if (sortField && sortDirection) {
      params = params.set('sort', `${sortField},${sortDirection.toLowerCase()}`);
    }

    return this.http.post<PageResponse<Manga>>(
      `${environment.apiUrl}/search`,
      bodyFilters,
      { params }
    );
  }

  submit(report: ReportRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/reports`, report);
  }

}
