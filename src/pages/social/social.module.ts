import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ShrinkHeaderModule } from '../../components/shrink-header/shrink-header.module';
import { SocialPage } from './social';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    SocialPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialPage),
    TranslateModule.forChild(),
    ShrinkHeaderModule,
    IonicImageViewerModule
  ],
  exports: [
    SocialPage
  ]
})
export class SocialPageModule {}
