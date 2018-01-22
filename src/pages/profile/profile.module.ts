import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';

import { ShrinkSegmentHeader } from '../../components/shrink-segment-header/shrink-segment-header';
 


@NgModule({
  declarations: [
    ProfilePage,
    ShrinkSegmentHeader
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
   
  ],
})
export class ProfilePageModule {}
