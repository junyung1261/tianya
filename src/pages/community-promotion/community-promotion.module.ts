import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityPromotionPage } from './community-promotion';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CommunityPromotionPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityPromotionPage),
    TranslateModule
  ],
})
export class CommunityPromotionPageModule {}
