import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  title = 'pam';

  @Input()
  backButton = false;

  loggedIn$: Observable<boolean>;

  constructor(
    private navController: NavController,
    private authService: AuthService) { }

  ngOnInit() {
    this.loggedIn$ = this.authService.getLoginStatus();
  }

  public logout(): void {
    this.authService.logout();
    this.navController.navigateRoot('login');
  }

  public back(): void {
    this.navController.back();
  }

}
