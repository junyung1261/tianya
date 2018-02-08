import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialCreatePage } from './social-create';
import { ElasticModule } from '../../directives/elastic-textArea/elastic-textArea.module'
import { ImageUploadModule } from "../../components/image-upload/image-upload.module";


@NgModule({
  declarations: [
    SocialCreatePage,
    
    
    
  ],
  imports: [
    IonicPageModule.forChild(SocialCreatePage),
    ImageUploadModule,
    ElasticModule
  ],
  providers:[
    
  ]
})
export class SocialCreatePageModule {}
