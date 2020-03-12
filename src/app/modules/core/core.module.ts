import { NgModule } from '@angular/core';
import { AuthorizationInterceptor } from './authorization-intercepotor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
  ]
})
export class CoreModule {
}
