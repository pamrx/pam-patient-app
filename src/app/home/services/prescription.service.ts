import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { Prescription } from 'src/app/auth/models/prescription.model';
import { Patient } from 'src/app/auth/models/patient.model';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/shared/services/storage.service';
import { mergeMap, shareReplay, share, map } from 'rxjs/operators';
import { deserialize, serialize } from 'json-typescript-mapper';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private prescriptions$: BehaviorSubject<Prescription[]> = new BehaviorSubject<Prescription[]>([]);

  constructor(
    private http: HttpClient) { }

  public getPrescriptions(patientId): Observable<Prescription[]> {
    this.loadPrescriptions(patientId).subscribe((scripts) => {
      this.prescriptions$.next(scripts);
    });
    return this.prescriptions$;
  }

  private loadPrescriptions(patientId): Observable<Prescription[]> {
    return this.http.get<any[]>(`${environment.baseUrl}/patients/${patientId}/prescriptions`)
    .pipe(map((rawPrescriptions) => {
      const prescriptions: Prescription[] = [];
      rawPrescriptions.forEach((rawPrescription) => {
        prescriptions.push(deserialize(Prescription, rawPrescription));
      });
      return prescriptions;
    }));
  }

  public recordAdherence(notificationId: string, response: number): Observable<void> {
    return this.http.post<void>(encodeURI(`${environment.baseUrl}/notifications/${notificationId}`), response);
  }

  public recordAdherenceOnDemand(patientId: string, prescriptionId: string, response: number): Observable<void> {
    return this.http.post<void>(encodeURI(`${environment.baseUrl}/patients/${patientId}/${prescriptionId}`), response);
  }

  public createPrescription(patientId: string, prescription: Prescription): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/patients/${patientId}/prescriptions`, serialize(prescription));
  }
}
