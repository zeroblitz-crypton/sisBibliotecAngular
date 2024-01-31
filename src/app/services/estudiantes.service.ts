import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private apiUrl = 'http://localhost:5000/api/estudiantes'; // Ajusta la URL según tu configuración

  constructor(private http: HttpClient) {}

  // Obtener todos los estudiantes
  getEstudiantes(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener un estudiante por ID
  getEstudiante(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo estudiante
  createEstudiante(estudiante: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, estudiante);
  }

  // Actualizar un estudiante por ID
  updateEstudiante(id: number, estudiante: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, estudiante);
  }

  // Eliminar un estudiante por ID
  deleteEstudiante(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
