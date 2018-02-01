import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagePage } from './message';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(MessagePage),
    SuperTabsModule.forRoot()
  ],
})
export class MessagePageModule {}
