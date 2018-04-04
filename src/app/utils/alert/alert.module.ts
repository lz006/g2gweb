import { ToasterModule } from 'angular2-toaster';
import { AlertComponent } from './alert.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AlertComponent,
  ],
  imports: [
    ToasterModule,
  ],
  exports: [
    AlertComponent
  ]
})
export class AlertModule {}