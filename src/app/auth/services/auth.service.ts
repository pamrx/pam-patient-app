import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { PushService } from 'src/app/shared/services/push.service';
import { Patient } from '../models/patient.model';
import { environment } from '../../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { deserialize } from 'json-typescript-mapper';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private pushService: PushService,
    private http: HttpClient,
    private storageService: StorageService) {
    this.storageService.get('user').then((user) => this.loginStatus.next(!!user));
  }

  public getLoginStatus(): Observable<boolean> {
    return this.loginStatus;
  }

  public login(username: string): Observable<void> {
    return this.http.get<Patient>(`${environment.baseUrl}/patients/${username}/login`)
      .pipe(map((patient) => {
        this.pushService.registerPush();
        this.storageService.set('user', JSON.stringify(deserialize(Patient, patient)));
        this.loginStatus.next(true);
      }),
        catchError((error) => throwError(error)));

  }

  public logout(): void {
    this.storageService.remove('user').then(() => {
      this.loginStatus.next(false);
    });
  }
}
