import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';

import { ShrinkSegmentHeaderModule } from '../../components/shrink-segment-header/shrink-segment-header.module';
 


@NgModule({
  declarations: [
    ProfilePage,
    
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    ShrinkSegmentHeaderModule
   
  ],
})
export class ProfilePageModule {}
