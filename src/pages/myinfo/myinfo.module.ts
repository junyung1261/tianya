import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyinfoPage } from './myinfo';
import { ElasticHeaderModule } from '../../components/elastic-header/elastic-header.module';
import { IonCoverHeaderModule } from '../../components/ion-cover-header/ion-cover-header.module';


@NgModule({
  declarations: [
    MyinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MyinfoPage),
    ElasticHeaderModule,
    IonCoverHeaderModule,
    
  ],
})
export class MyinfoPageModule {}
