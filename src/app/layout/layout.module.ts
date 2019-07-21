import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { MoreMenuComponent } from './components/more-menu/more-menu.component';

@NgModule({
  declarations: [HeaderComponent, MoreMenuComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    HeaderComponent,
    MoreMenuComponent
  ],
  entryComponents: [
    MoreMenuComponent
  ]
})
export class LayoutModule { }
