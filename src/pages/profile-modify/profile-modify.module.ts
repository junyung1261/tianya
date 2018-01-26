
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileModifyPage } from './profile-modify';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    ProfileModifyPage,
  ],
  imports: [
    HttpModule,
    IonicPageModule.forChild(ProfileModifyPage),
  ],
})
export class ProfileModifyPageModule {}
