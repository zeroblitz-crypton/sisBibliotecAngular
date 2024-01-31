import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {
  private apiUrl = 'http://localhost:5000/api/permisos'; // Cambiar la URL según tu configuración
  private apiUrlDetalle = 'http://localhost:5000/api/detalle_permisos';
  constructor(private http: HttpClient) {}

  getPermisos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  getDetallePermisos(id:any): Observable<any>{
    return this.http.get(`${this.apiUrlDetalle}/${id}`);
  }

  guardarDetallesPermisos(nuevosDetalles: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrlDetalle}`, nuevosDetalles);
  }

  actualizarDetallesPermisos(detallesActualizados: any[],id:number): Observable<any> {
    return this.http.put<any>(`${this.apiUrlDetalle}/${id}`, detallesActualizados);
  }
}
