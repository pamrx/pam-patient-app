import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Medication } from './models/medication.model';
import { MedicationService } from './services/medication.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.page.html',
  styleUrls: ['./add-prescription.page.scss']
})
export class AddPrescriptionPage implements OnInit {

  public prescription: FormGroup;

  public medications$: Observable<Medication[]>;
  private searchTerm: string;

  constructor(
    private formBuilder: FormBuilder,
    private medicationService: MedicationService) {
    this.prescription = this.formBuilder.group({
      name: [''],
      medicationId: ['', Validators.required],
      dosage: [''],
      frequency: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.prescription.valueChanges.subscribe((changes) => {
      console.log(changes);
      if (this.searchTerm !== changes.name) {
        this.searchTerm = changes.name;
        this.search();
      }
    });
  }

  private search(): void {
    this.medications$ = this.medicationService.getMedications(this.searchTerm);
  }

  public submit() {
    console.log(this.prescription.value);
  }
}
