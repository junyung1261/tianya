import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatSettingPage } from './chat-setting';

@NgModule({
  declarations: [
    ChatSettingPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatSettingPage),
  ],
})
export class ChatSettingPageModule {}
