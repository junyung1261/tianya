import { IonicModule } from 'ionic-angular';
import { ParallaxHeader } from './parallax-header';
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    ParallaxHeader
  ],
  imports: [
    IonicModule
  ],
  exports: [
    ParallaxHeader
  ]
})
export class ParallaxHeaderModule {}