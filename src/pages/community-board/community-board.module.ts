import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityBoardPage } from './community-board';

@NgModule({
  declarations: [
    CommunityBoardPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityBoardPage),
  ],
})
export class CommunityBoardPageModule {}
