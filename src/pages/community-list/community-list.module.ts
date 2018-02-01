import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityListPage } from './community-list';
import { TranslateModule } from '@ngx-translate/core';
// import { DateFormatPipe } from '../../pipes/date';

@NgModule({
  declarations: [
    CommunityListPage,
    // DateFormatPipe
  ],
  imports: [
    IonicPageModule.forChild(CommunityListPage),
    TranslateModule
  ],
})
export class CommunityListPageModule {}
