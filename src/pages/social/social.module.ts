import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ShrinkHeaderModule } from '../../components/shrink-header/shrink-header.module';
import { SocialPage } from './social';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { PipeModule } from '../../pipes/pipe.module';
import { HideFabModule } from "../../directives/hide-fab/hide-fab.module";



@NgModule({
  declarations: [
    SocialPage,
    
  ],
  imports: [
    IonicPageModule.forChild(SocialPage),
    TranslateModule.forChild(),
    ShrinkHeaderModule,
    IonicImageViewerModule,
    HideFabModule,
    PipeModule

  ],
  exports: [
    SocialPage
  ]
})
export class SocialPageModule {}
