import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ButtonSpinnerComponent } from './components/button-spinner/button-spinner.component';

@NgModule({
  declarations: [ButtonSpinnerComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ButtonSpinnerComponent
  ]
})
export class SharedModule { }
