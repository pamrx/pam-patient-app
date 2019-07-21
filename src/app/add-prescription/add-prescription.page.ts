import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Medication } from './models/medication.model';
import { MedicationService } from './services/medication.service';
import { PrescriptionService } from '../home/services/prescription.service';
import { Prescription } from '../auth/models/prescription.model';
import { StorageService } from '../shared/services/storage.service';
import { Patient } from '../auth/models/patient.model';
import { UnsubscribeComponent } from '../shared/components/unsubscribe.abstract';
import { takeUntil } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.page.html',
  styleUrls: ['./add-prescription.page.scss']
})
export class AddPrescriptionPage extends UnsubscribeComponent implements OnInit {

  public prescriptionForm: FormGroup;

  public medications$: Observable<Medication[]>;
  showList = false;
  private searchTerm: string;
  private selectedMedicine: string;

  constructor(
    private formBuilder: FormBuilder,
    private medicationService: MedicationService,
    private prescriptionService: PrescriptionService,
    private storageService: StorageService,
    private navController: NavController) {
    super();
    this.prescriptionForm = this.formBuilder.group({
      searchTerm: [''],
      drug: ['', Validators.required],
      begdate: ['', Validators.required],
      form: ['2', Validators.required],
      dosage: ['', Validators.required],
      size: ['', Validators.required],
      unit: ['1', Validators.required],
      route: ['', Validators.required],
      interval: ['9', Validators.required],
      refills: ['', Validators.required],
      perRefill: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.prescriptionForm.valueChanges.subscribe((changes) => {
      console.log(changes);
      console.log(this.selectedMedicine);
      if (this.searchTerm !== changes.searchTerm) {
        this.searchTerm = changes.searchTerm;
        this.showList = true;
        this.search();
      } else if (this.selectedMedicine !== changes.drug) {
        this.selectedMedicine = changes.drug;
        this.prescriptionForm.value.searchTerm = this.selectedMedicine;
        this.prescriptionForm.setValue(this.prescriptionForm.value);
        this.showList = false;
      }
    });
  }

  private search(): void {
    this.medications$ = this.medicationService.getMedications(this.searchTerm);
  }

  public submit() {
    this.storageService.get('user').then((rawUser) => {
      const user = JSON.parse(rawUser) as Patient;

      const prescription = new Prescription({
        patientId: user.pid,
        drug: this.prescriptionForm.value.drug,
        startDate: this.getDate(this.prescriptionForm.value.begdate),
        form: this.prescriptionForm.value.form.toString(),
        dosage: this.prescriptionForm.value.dosage.toString(),
        quantity: this.prescriptionForm.value.perRefill.toString(),
        size: this.prescriptionForm.value.size.toString(),
        unit: this.prescriptionForm.value.unit.toString(),
        route: this.prescriptionForm.value.route.toString(),
        // tslint:disable-next-line:radix
        interval: parseInt(this.prescriptionForm.value.interval),
        refills: this.prescriptionForm.value.refills.toString(),
        perRefill: this.prescriptionForm.value.perRefill.toString()
      });
      console.log(prescription);
      this.prescriptionService.createPrescription(user.pid, prescription)
        .pipe(takeUntil(this.unsubscriber))
        .subscribe(() => {
          this.navController.navigateRoot('home');
        });

    });
  }

  private getDate(stringDate: string): string {
    const date = new Date(stringDate);
    return `${date.getFullYear()}-${this.getTwoDigit(date.getMonth() + 1)}-${this.getTwoDigit(date.getDate())}`;
  }

  private getTwoDigit(value: number): string {
    const stringVal = `00${value}`;
    return stringVal.substring(stringVal.length - 2, stringVal.length);
  }
}
