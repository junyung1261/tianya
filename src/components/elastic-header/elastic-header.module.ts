import { IonicModule } from 'ionic-angular';
import { ElasticHeader } from './elastic-header';
import { NgModule } from '@angular/core';
 
@NgModule({
  declarations: [
    ElasticHeader
  ],
  imports: [
    IonicModule
  ],
  exports: [
    ElasticHeader
  ]
})
export class ElasticHeaderModule {}