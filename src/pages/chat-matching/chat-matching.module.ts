import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatMatchingPage } from './chat-matching';

@NgModule({
  declarations: [
    ChatMatchingPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatMatchingPage),
  ],
})
export class ChatMatchingPageModule {}
