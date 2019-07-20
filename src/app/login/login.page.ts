import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginUser } from './models/login-user.model';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  user: LoginUser = new LoginUser();

  constructor(
    private authService: AuthService,
    private navController: NavController) { }

  public login(): void {
    this.authService.login();
    this.navController.navigateRoot('home');
  }

}
