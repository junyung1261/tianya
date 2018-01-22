
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NoticePage } from './notice';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    NoticePage,
  ],
  imports: [
    HttpModule,
    IonicPageModule.forChild(NoticePage),
  ],
})
export class NoticePageModule {}
