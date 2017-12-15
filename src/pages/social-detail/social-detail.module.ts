import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialDetailPage } from './social-detail';

@NgModule({
  declarations: [
    SocialDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialDetailPage),
  ],
})
export class SocialDetailPageModule {}
