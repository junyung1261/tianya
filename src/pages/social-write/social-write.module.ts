import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialWritePage } from './social-write';

@NgModule({
  declarations: [
    SocialWritePage,
  ],
  imports: [
    IonicPageModule.forChild(SocialWritePage),
  ],
})
export class SocialWritePageModule {}
