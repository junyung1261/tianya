import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityTemplatePage } from './community-template';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    CommunityTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityTemplatePage),
    TranslateModule,
    SuperTabsModule.forRoot()
  ],
})
export class CommunityTemplatePageModule {}
