import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialCreatePage } from './social-create';
import { Elastic } from '../../directives/elastic-textArea/elastic-textArea'
import { PhotoLibrary } from '@ionic-native/photo-library';


@NgModule({
  declarations: [
    SocialCreatePage,
    Elastic
  ],
  imports: [
    IonicPageModule.forChild(SocialCreatePage),
  ],
  providers:[
    PhotoLibrary
  ]
})
export class SocialCreatePageModule {}
