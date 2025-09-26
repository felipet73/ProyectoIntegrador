import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OpenAIService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  generarReporte(prompt: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/reporte`, { prompt });
  }
}