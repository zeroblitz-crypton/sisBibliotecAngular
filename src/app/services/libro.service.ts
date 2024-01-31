import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private baseUrl = 'http://localhost:5000/api';
  private endpoint = 'libros';

  constructor(private http: HttpClient) {}

  // Obtener todos los libros
  getLibros(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${this.endpoint}`);
  }

  // Obtener un libro por ID
  getLibroById(libroId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${this.endpoint}/${libroId}`);
  }

  // Crear un nuevo libro
  crearLibro(libroData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${this.endpoint}`, libroData);
  }

  // Actualizar un libro por ID
  actualizarLibro(libroId: number, libroData: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${this.endpoint}/${libroId}`, libroData);
  }

  // Eliminar un libro por ID
  eliminarLibro(libroId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${this.endpoint}/${libroId}`);
  }
  
}
