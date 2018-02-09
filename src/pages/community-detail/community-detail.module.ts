import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommunityDetailPage } from './community-detail';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { PipeModule } from '../../pipes/pipe.module';




@NgModule({
  declarations: [
    CommunityDetailPage
    
  ],
  imports: [
    IonicPageModule.forChild(CommunityDetailPage),
    TranslateModule.forChild(),
    IonicImageViewerModule,
    PipeModule
  ],
  exports: [
    CommunityDetailPage
  ]
})
export class CommunityDetailPageModule {}
