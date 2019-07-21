import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Prescription } from '../auth/models/prescription.model';
import { PrescriptionService } from './services/prescription.service';
import { UnsubscribeComponent } from '../shared/components/unsubscribe.abstract';
import { takeUntil } from 'rxjs/operators';
import { Patient } from '../auth/models/patient.model';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage extends UnsubscribeComponent implements OnInit {

  public prescriptions$: Observable<Prescription[]>;
  private patientId: string;

  constructor(
    private prescriptionService: PrescriptionService,
    private storageService: StorageService) {
    super();
  }

  ngOnInit(): void {
    this.prescriptions$ = this.prescriptionService.getPrescriptions();
    this.storageService.get('user').then((user) => {
      this.patientId = (JSON.parse(user) as Patient).pid;
    });
  }

  public recordAdherence(prescription: Prescription): void {
    this.prescriptionService.recordAdherence(this.patientId, prescription.medicationId, prescription.checked)
      .pipe(takeUntil(this.unsubscriber))
      .subscribe(() => console.log('updated'));
  }

}
