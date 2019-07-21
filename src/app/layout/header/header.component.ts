import { Component, OnInit, Input } from '@angular/core';
import { NavController, PopoverController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { MoreMenuComponent } from '../components/more-menu/more-menu.component';

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
    private authService: AuthService,
    private popoverController: PopoverController) { }

  ngOnInit() {
    this.loggedIn$ = this.authService.getLoginStatus();
  }

  public showMenu(): void {
    this.popoverController.create({
      component: MoreMenuComponent,
      translucent: true
    }).then((popover) => {
      popover.present();
    });
  }

  public back(): void {
    this.navController.back();
  }

}
