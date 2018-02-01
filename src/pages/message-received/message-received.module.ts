import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageReceivedPage } from './message-received';

@NgModule({
  declarations: [
    MessageReceivedPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageReceivedPage),
  ],
})
export class MessageReceivedPageModule {}
