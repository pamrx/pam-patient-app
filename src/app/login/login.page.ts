import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth/services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { UnsubscribeComponent } from '../shared/components/unsubscribe.abstract';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends UnsubscribeComponent {

  public error: string;

  public showSpinner = false;

  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private navController: NavController,
    private formBuilder: FormBuilder) {
    super();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login(): void {
    this.showSpinner = true;
    this.authService.login(this.loginForm.value.username)
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
