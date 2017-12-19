import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatTabsPage } from './chat-tabs';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    ChatTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatTabsPage),
    SuperTabsModule.forRoot()
  ],
})
export class ChatTabsPageModule {}
