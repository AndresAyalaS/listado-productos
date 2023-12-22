import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = environment.apiUrl; // Tu URL base de la API

  constructor(private http: HttpClient) {}

  // Métodos para realizar solicitudes HTTP a la API falsa

  // Obtener todos los elementos
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Obtener un elemento por ID
  getItemById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo elemento
  createItem(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, item);
  }

  // Actualizar un elemento existente
  updateItem(id: any, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);
  }

  // Eliminar un elemento por ID
  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
