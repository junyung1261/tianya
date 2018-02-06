import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyinfoModifyPage } from './myinfo-modify';

@NgModule({
  declarations: [
    MyinfoModifyPage,
  ],
  imports: [
    IonicPageModule.forChild(MyinfoModifyPage),
  ],
})
export class MyinfoModifyPageModule {}
