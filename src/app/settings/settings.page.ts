import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  notificationsEnabled: boolean

  constructor() { }

  ngOnInit() {
    this.notificationsEnabled = true
  }

  toggleNotifications() {
    this.notificationsEnabled = !this.notificationsEnabled
  }
}
