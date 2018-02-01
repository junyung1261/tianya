import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityCreatePage } from './community-create';
// import { Elastic } from '../../directives/elastic-textArea/elastic-textArea'
import { ImageUploadModule } from "../../components/image-upload/image-upload.module";

@NgModule({
  declarations: [
    CommunityCreatePage,
    // Elastic
  ],
  imports: [
    IonicPageModule.forChild(CommunityCreatePage),
    ImageUploadModule
  ],
})
export class CommunityCreatePageModule {}

