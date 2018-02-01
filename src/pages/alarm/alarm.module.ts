
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlarmPage } from './alarm';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AlarmPage,
  ],
  imports: [
    HttpModule,
    IonicPageModule.forChild(AlarmPage),
  ],
})
export class AlarmPageModule {}