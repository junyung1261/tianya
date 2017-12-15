import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityListPage } from './community-list';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CommunityListPage,
  ],
  imports: [
    IonicPageModule.forChild(CommunityListPage),
    TranslateModule
  ],
})
export class CommunityListPageModule {}
