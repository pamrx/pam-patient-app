import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions, EventResponse } from '@ionic-native/push/ngx';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { PrescriptionService } from '../../home/services/prescription.service';
import { Patient } from 'src/app/auth/models/patient.model';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(
    private push: Push,
    private alertController: AlertController,
    private prescriptionService: PrescriptionService,
    private storageService: StorageService,
    private http: HttpClient) { }

  public registerPush(): void {
    this.push.hasPermission()
      .then((res: any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

    const options: PushOptions = {
      android: {},
      ios: {
        sound: true,
        alert: true,
        badge: true,
        categories: {
          confirm: {
            yes: {
              callback: 'yes',
              title: 'Yes',
              foreground: true,
              destructive: false
            },
            no: {
              callback: 'ignore',
              title: 'Ignore',
              foreground: true,
              destructive: true
            },
            maybe: {
              callback: 'remind',
              title: 'Ask Me Later',
              foreground: true,
              destructive: false
            }
          }
        }
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('registration').subscribe(data => {
      console.log('registered!');
      console.log(data);
      this.registerDevice(data);
    });

    pushObject.on('notification').subscribe((data: EventResponse) => {
      console.log(data);
      pushObject.finish(data.additionalData.notId).then(
        () => {
          this.confirmMedication(data);
        },
        () => {
          console.log(
            'something went wrong with push.finish for ID =',
            data.additionalData.notId
          );
        }
      );
    });

    pushObject.on('yes').subscribe((data) => {
      // do something with the notification data

      pushObject.finish(data.additionalData.notId).then(() => {
        this.recordAdherence(0, data.additionalData.notificationId);
      }, () => {
        console.log('accept callback failed');
      });
    });

    pushObject.on('ignore').subscribe((data) => {
      // do something with the notification data

      pushObject.finish(data.additionalData.notId).then(() => {
        this.recordAdherence(1, data.additionalData.notificationId);
      }, () => {
        console.log('no callback failed');
      });
    });
    pushObject.on('remind').subscribe((data) => {
      // do something with the notification data

      pushObject.finish(data.additionalData.notId).then(() => {
        this.recordAdherence(2, data.additionalData.notificationId);
      }, () => {
        console.log('remind callback failed');
      });
    });
  }

  private confirmMedication(data: EventResponse): void {
    const alertOptions: AlertOptions = {
      header: data.title,
      message: data.message,
      buttons: [
        {
          text: 'Ask Me Later',
          handler: () => {
            this.recordAdherence(2, data.additionalData.notificationId);
            console.log('Remind clicked');
          }
        },
        {
          text: 'Ignore',
          handler: () => {
            this.recordAdherence(1, data.additionalData.notificationId);
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.recordAdherence(0, data.additionalData.notificationId);
            console.log('Yes clicked');
          }
        },
      ]
    };
    this.alertController.create(alertOptions).then((alert) => alert.present());
  }

  private recordAdherence(response: number, notificationId: string): void {
    this.prescriptionService.recordAdherence(notificationId, response).subscribe(() => {
      console.log('success');
    });
  }

  private registerDevice(data): void {
    console.log('inside register device');
    this.storageService.get('user').then((rawUser) => {
      console.log(rawUser);
      if (rawUser) {
        const user = JSON.parse(rawUser) as Patient;
        this.http.post<void>(`${environment.baseUrl}/patients/${user.pid}/notificationToken`, data.registrationId)
          .subscribe((response) => {
            console.log('inside post');
            console.log(response);
          });
      } else {
        console.log('unable to determine user to record adherence');
      }
    }).catch((error) => console.log(error));
  }
}
