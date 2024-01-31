import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoresService {
  private apiUrl = 'http://localhost:5000/api/autores';

  constructor(private http: HttpClient) {}

  createAutor(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  getAutores(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getAutorById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateAutor(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteAutor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  
}
