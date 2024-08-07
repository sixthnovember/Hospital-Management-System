import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Nurse {
  _id?: string;
  name: string;
  diploma: boolean;
  address: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  private apiUrl = 'http://localhost:3000/api/nurses';

  constructor(private http: HttpClient) {}

  getNurses(): Observable<Nurse[]> {
    return this.http.get<Nurse[]>(this.apiUrl);
  }

  addNurse(nurse: Nurse): Observable<Nurse> {
    return this.http.post<Nurse>(this.apiUrl, nurse);
  }

  updateNurse(id: string, nurse: Nurse): Observable<Nurse> {
    return this.http.put<Nurse>(`${this.apiUrl}/${id}`, nurse);
  }

  deleteNurse(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}