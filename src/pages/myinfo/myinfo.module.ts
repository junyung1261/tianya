import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyinfoPage } from './myinfo';
import { ParallaxHeaderModule } from '../../components/parallax-header/parallax-header.module';
import { IonCoverHeaderModule } from '../../components/ion-cover-header/ion-cover-header.module';


@NgModule({
  declarations: [
    MyinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MyinfoPage),
    ParallaxHeaderModule,
    IonCoverHeaderModule
    
  ],
})
export class MyinfoPageModule {}
