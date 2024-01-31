import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private apiUrl = 'http://localhost:5000/api/configuracion';

  constructor(private http: HttpClient) {}

  getConfiguracion(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateConfiguracion(configId: number, configuracion: any): Observable<any> {
    const url = `${this.apiUrl}/${configId}`;
    return this.http.put<any>(url, configuracion);
  }

}
