import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityCreatePage } from './community-create';
// import { Elastic } from '../../directives/elastic-textArea/elastic-textArea'
import { ImageUploadModule } from "../../components/image-upload/image-upload.module";
import { TranslateModule } from '@ngx-translate/core';
import { ElasticModule } from '../../directives/elastic-textArea/elastic-textArea.module'

@NgModule({
  declarations: [
    CommunityCreatePage,
    // Elastic
  ],
  imports: [
    IonicPageModule.forChild(CommunityCreatePage),
    ImageUploadModule,
    ElasticModule,
    TranslateModule.forChild()
  ],
})
export class CommunityCreatePageModule {}