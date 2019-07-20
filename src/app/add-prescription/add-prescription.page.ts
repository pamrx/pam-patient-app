import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.page.html',
  styleUrls: ['./add-prescription.page.scss'],
})
export class AddPrescriptionPage {

  public prescription: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.prescription = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }
  logForm() {
    console.log(this.prescription.value);
  }
}
