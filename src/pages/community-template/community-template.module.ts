import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityTemplatePage } from './community-template';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from '../../pipes/pipe.module';
import { HideFabModule } from "../../directives/hide-fab/hide-fab.module";

@NgModule({
  declarations: [
    CommunityTemplatePage,
   
  ],
  imports: [
    IonicPageModule.forChild(CommunityTemplatePage),
    TranslateModule,
    PipeModule,
    HideFabModule
   
  ],
})
export class CommunityTemplatePageModule {}
