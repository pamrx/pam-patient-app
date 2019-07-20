import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeComponent } from '../shared/components/unsubscribe.abstract';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends UnsubscribeComponent {

  public error: string;

  public showSpinner = false;

  constructor(
    private authService: AuthService,
    private navController: NavController) {
    super();
  }

  public login(): void {
    this.showSpinner = true;
    this.authService.login()
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => {
        this.navController.navigateRoot('home');
        this.showSpinner = false;
      }, (error) => {
        this.showSpinner = false;
        console.log(error);
        this.error = error.message;
      });
  }

}
