import { IonicModule } from 'ionic-angular';
import { IonCoverHeader } from './ion-cover-header';
import { IonCoverHeader_1 } from './ion-cover-header_1';
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    IonCoverHeader,
    IonCoverHeader_1
  ],
  imports: [
    IonicModule
  ],
  exports: [
    IonCoverHeader,
    IonCoverHeader_1
  ]
})
export class IonCoverHeaderModule {}