import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { BaiduMapModule } from 'angular2-baidu-map';



@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    BaiduMapModule.forRoot({ak: 'your ak'})
  ],
})
export class HomePageModule {}
