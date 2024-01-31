import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'llavebiblioteca';
  private apiUrl = 'http://localhost:5000/sis/login'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) {}

  login(data: any){
   
            const usuarioJson=JSON.stringify({
              nombre:"sisbiblioteca"
            })
            localStorage.setItem(this.TOKEN_KEY, usuarioJson);
       
  }
  logout(): void {
    // Lógica de cierre de sesión
    // ...

    // Elimina el token del almacenamiento local al cerrar sesión
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    // Verifica la presencia del token en el almacenamiento local
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}