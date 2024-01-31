import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'http://localhost:5000/api/usuarios'; // Cambiar la URL según tu configuración

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUsuario(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${usuarioId}`);
  }

  createUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  updateUsuario(usuarioId: number, usuario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${usuarioId}`, usuario);
  }

  deleteUsuario(usuarioId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${usuarioId}`);
  }
}
