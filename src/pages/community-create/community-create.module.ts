import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityCreatePage } from './community-create';

@NgModule({
  declarations: [
    CommunityCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityCreatePage),
  ],
})
export class CommunityCreatePageModule {}
