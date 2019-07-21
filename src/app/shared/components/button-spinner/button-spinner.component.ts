import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-spinner',
  templateUrl: './button-spinner.component.html',
  styleUrls: ['./button-spinner.component.scss'],
})
export class ButtonSpinnerComponent {

  @Input()
  text: string;

  @Input()
  disable = false;

  @Input()
  showSpinner = false;

  @Input()
  expand = 'block';

  @Output()
  action: EventEmitter<any> = new EventEmitter();

  constructor() { }

}
