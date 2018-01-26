import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialCreatePage } from './social-create';
import { Elastic } from '../../directives/elastic-textArea/elastic-textArea'
import { ImagePicker } from '@ionic-native/image-picker';


@NgModule({
  declarations: [
    SocialCreatePage,
    Elastic
  ],
  imports: [
    IonicPageModule.forChild(SocialCreatePage),
  ],
  providers:[
    ImagePicker
  ]
})
export class SocialCreatePageModule {}
