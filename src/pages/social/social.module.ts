import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { ShrinkHeaderModule } from '../../components/shrink-header/shrink-header.module';
import { SocialPage } from './social';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { DateFormatPipe } from '../../pipes/date';
import { HideFabDirective } from "../../directives/hide-fab/hide-fab";



@NgModule({
  declarations: [
    SocialPage,
    HideFabDirective,
    DateFormatPipe
    
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
