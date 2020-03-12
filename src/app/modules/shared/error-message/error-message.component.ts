import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styles: [
    '::ng-deep ng-component { display: flex; flex-direction: column; flex: 1; min-height:0px; }'
  ]
})
export class ErrorMessageComponent {
  @Input() message: any;

  constructor() {}
}

