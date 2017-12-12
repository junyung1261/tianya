import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ShrinkHeaderModule } from '../../components/shrink-header/shrink-header.module';
import { SocialPage } from './social';

@NgModule({
  declarations: [
    SocialPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialPage),
    TranslateModule.forChild(),
    ShrinkHeaderModule
  ],
  exports: [
    SocialPage
  ]
})
export class SocialPageModule {}
