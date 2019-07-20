import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddPrescriptionPage } from './add-prescription.page';
import { LayoutModule } from '../layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: AddPrescriptionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddPrescriptionPage]
})
export class AddPrescriptionPageModule {}
