import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialCreatePage } from './social-create';

@NgModule({
  declarations: [
    SocialCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(SocialCreatePage),
  ],
})
export class SocialCreatePageModule {}
