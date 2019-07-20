import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { PushService } from 'src/app/shared/services/push.service';
import { Patient } from '../models/patient.model';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { deserialize } from 'json-typescript-mapper';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private pushService: PushService,
    private http: HttpClient) {
    this.loginStatus.next(!!sessionStorage.getItem('user'));
  }

  public getLoginStatus(): Observable<boolean> {
    return this.loginStatus;
  }

  public login(): Observable<void> {
    return this.http.get<Patient>(`${environment.baseUrl}/patients/5d32bad78097686ebb39121f`)
      .pipe(map((patient) => {
        this.pushService.registerPush();
        sessionStorage.setItem('user', JSON.stringify(deserialize(Patient, patient)));
        this.loginStatus.next(true);
      }),
        catchError((error) => throwError(error)));

  }

  public logout(): void {
    sessionStorage.removeItem('user');
    this.loginStatus.next(false);
  }
}
