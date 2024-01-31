import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  private apiUrl = 'http://localhost:5000/api/editoriales';

  constructor(private http: HttpClient) {}

  createEditorial(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  getEditoriales(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  getEditorialById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateEditorial(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteEditorial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
