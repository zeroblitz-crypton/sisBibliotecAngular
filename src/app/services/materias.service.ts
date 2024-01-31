import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private apiUrl = 'http://localhost:5000/api';  // Reemplaza con la URL de tu servidor

  constructor(private http: HttpClient) {}

  getMaterias(): Observable<any> {
    return this.http.get(`${this.apiUrl}/materias`);
  }

  getMateria(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/materias/${id}`);
  }

  createMateria(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/materias`, data);
  }

  updateMateria(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/materias/${id}`, data);
  }

  deleteMateria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/materias/${id}`);
  }
}
