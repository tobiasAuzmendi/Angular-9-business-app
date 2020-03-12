import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { RequestStatusPipe } from './request-status.pipe';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    RequestStatusPipe,
    ErrorMessageComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpinnerComponent,
    RequestStatusPipe,
    ErrorMessageComponent,
    NavbarComponent
  ]
})
export class SharedModule {
}

