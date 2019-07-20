import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Medication } from '../models/medication.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {

  constructor(private http: HttpClient) { }

  public getMedications(searchTerm: string): Observable<Medication[]> {
    return this.http.get<Medication[]>(`${environment.baseUrl}/medications?title=${encodeURI(searchTerm)}`)
    .pipe(
      map((medications: Medication[]) => {
        return medications;
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      }));
  }
}
