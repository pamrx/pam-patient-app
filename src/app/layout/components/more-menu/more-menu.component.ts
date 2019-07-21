import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-more-menu',
  templateUrl: './more-menu.component.html',
  styleUrls: ['./more-menu.component.scss'],
})
export class MoreMenuComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private popoverController: PopoverController,
    private navController: NavController) { }

  ngOnInit() {}

  public logout(): void {
    this.dismiss();
    this.authService.logout();
    this.navController.navigateRoot('login');
  }

  public dismiss(): void {
    this.popoverController.dismiss();
  }

  public goToSettings(): void {
    this.dismiss();
    this.navController.navigateForward('settings');
  }

}
