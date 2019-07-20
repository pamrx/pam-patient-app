import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Prescription } from 'src/app/auth/models/prescription.model';
import { Patient } from 'src/app/auth/models/patient.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(private http: HttpClient) { }

  public getPrescriptions(): Observable<Prescription[]> {
    const rawUser = sessionStorage.getItem('user');
    if (rawUser) {
      const user = JSON.parse(rawUser) as Patient;
      return of(user.prescriptions);
    } else {
      return of([]);
    }
  }

  public recordAdherence(patientId: string, medicationId: string, taken: boolean): Observable<void> {
    return this.http.post<void>(encodeURI(`${environment.baseUrl}/notify/${patientId}/${medicationId}/yes`), {});
  }
}
