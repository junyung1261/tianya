import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatProfilePage } from './chat-profile';

@NgModule({
  declarations: [
    ChatProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ChatProfilePage),
  ],
})
export class ChatProfilePageModule {}
