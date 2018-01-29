import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialCreatePage } from './social-create';
import { Elastic } from '../../directives/elastic-textArea/elastic-textArea'
import { ImageUploadModule } from "../../components/image-upload/image-upload.module";


@NgModule({
  declarations: [
    SocialCreatePage,
    Elastic,
    
    
  ],
  imports: [
    IonicPageModule.forChild(SocialCreatePage),
    ImageUploadModule
  ],
  providers:[
    
  ]
})
export class SocialCreatePageModule {}
