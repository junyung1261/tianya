import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
@NgModule({
  declarations: [
    ProfilePage,
    
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
})
export class ProfilePageModule {}
