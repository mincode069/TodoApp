import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Work } from '../interface/work';

@Injectable({
  providedIn: 'root',
})
export class WorkApiService {
  private apiUrl = 'https://6375996b48dfab73a4fbaf88.mockapi.io/app/v1/Work';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAllWorks(): Observable<Work[]> {
    return this.http.get<Work[]>(this.apiUrl);
  }

  getWork(id: number): Observable<Work> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Work>(url);
  }

  addWork(work: Work): Observable<Work> {
    return this.http.post<Work>(this.apiUrl, work, this.httpOptions);
  }

  deleteWork(id: number): Observable<Work> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Work>(url, this.httpOptions);
  }

  editWork(work: Work): Observable<Work> {
    const url = `${this.apiUrl}/${work.id}`;
    return this.http.put<Work>(url, work, this.httpOptions);
  }
}
