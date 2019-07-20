import { Injectable } from '@angular/core';
import { Push, PushObject, PushOptions, EventResponse } from '@ionic-native/push/ngx';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { PrescriptionService } from '../../home/services/prescription.service';
import { Patient } from 'src/app/auth/models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(
    private push: Push,
    private alertController: AlertController,
    private prescriptionService: PrescriptionService) { }

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
      // send data.registrationId to push service
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
        console.log('accept callback finished');
      }, () => {
        console.log('accept callback failed');
      });
    });

    pushObject.on('ignore').subscribe((data) => {
      // do something with the notification data

      pushObject.finish(data.additionalData.notId).then(() => {
        console.log('no callback finished');
      }, () => {
        console.log('no callback failed');
      });
    });
    pushObject.on('remind').subscribe((data) => {
      // do something with the notification data

      pushObject.finish(data.additionalData.notId).then(() => {
        console.log('remind callback finished');
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
          text: 'Yes',
          handler: () => {
            this.recordAdherence(true);
            console.log('Yes clicked');
          }
        },
        {
          text: 'Ignore',
          handler: () => {
            this.recordAdherence(false);
            console.log('No clicked');
          }
        },
        {
          text: 'Ask Me Later',
          handler: () => {
            this.recordAdherence(false);
            console.log('Remind clicked');
          }
        }
      ]
    };
    this.alertController.create(alertOptions).then((alert) => alert.present());
  }

  private recordAdherence(taken: boolean): void {
    const rawUser = sessionStorage.getItem('user');
    if (rawUser) {
      const user = JSON.parse(rawUser) as Patient;
      this.prescriptionService.recordAdherence(user.id, 'medicationId', taken).subscribe(() => {
        console.log('success');
      });
    } else {
      console.log('unable to determine user to record adherence');
    }
  }
}
