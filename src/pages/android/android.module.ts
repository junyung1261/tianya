import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AndroidPage } from './android';
import { IonCoverHeaderModule } from '../../components/ion-cover-header/ion-cover-header.module';
@NgModule({
  declarations: [
    AndroidPage,
  ],
  imports: [
    IonicPageModule.forChild(AndroidPage),
    IonCoverHeaderModule
  ],
})
export class AndroidPageModule {}
