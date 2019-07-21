import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { Prescription } from 'src/app/auth/models/prescription.model';
import { Patient } from 'src/app/auth/models/patient.model';
import { environment } from 'src/environments/environment';
import { StorageService } from 'src/app/shared/services/storage.service';
import { mergeMap, shareReplay, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService) { }

  public getPrescriptions(): Observable<Prescription[]> {
    return from(this.storageService.get('user'))
      .pipe(mergeMap((rawUser) => {
        if (rawUser) {
          const user = JSON.parse(rawUser) as Patient;
          return of(user.prescriptions);
        } else {
          return of([]);
        }
      }), share());
  }

  public recordAdherence(patientId: string, medicationId: string, taken: boolean): Observable<void> {
    return this.http.post<void>(encodeURI(`${environment.baseUrl}/notify/${patientId}/${medicationId}/yes`), {});
  }
}
