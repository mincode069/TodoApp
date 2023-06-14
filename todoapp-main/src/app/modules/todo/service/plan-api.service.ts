import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plan } from '../interface/plan';
@Injectable({
  providedIn: 'root',
})
export class PlanApiService {
  private apiUrl = 'https://6375996b48dfab73a4fbaf88.mockapi.io/app/v1/Plan';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAllPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.apiUrl);
  }

  getPlan(id: number): Observable<Plan> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Plan>(url);
  }

  addPlan(plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(this.apiUrl, plan, this.httpOptions);
  }

  deletePlan(id: number): Observable<Plan> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Plan>(url, this.httpOptions);
  }

  editPlan(plan: Plan): Observable<Plan> {
    const url = `${this.apiUrl}/${plan.id}`;
    return this.http.put<Plan>(url, plan, this.httpOptions);
  }
}
