import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loginStatus.next(!!sessionStorage.getItem('loggedin'));
  }

  public getLoginStatus(): Observable<boolean> {
    return this.loginStatus;
  }

  public login(): void {
    sessionStorage.setItem('loggedin', 'true');
    this.loginStatus.next(true);
  }

  public logout(): void {
    sessionStorage.removeItem('loggedin');
    this.loginStatus.next(false);
  }
}
