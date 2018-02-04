import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabsController} from 'ionic2-super-tabs';
/**
 * Generated class for the CommunityTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-community-template',
  templateUrl: 'community-template.html',
})
export class CommunityTemplatePage {

  pageIndex: any = 0;
  communityBoard: any = 'CommunityBoardPage';
  categoryName: any;
  tabParams: any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public superTabsCtrl: SuperTabsController) {
    this.categoryName = (this.navParams.get('categoryName'));
    this.tabParams = {categoryName:(this.navParams.get('categoryName'))};
  }


  closeCommunityTemplate(){
    this.navCtrl.pop();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityTemplatePage');
  }

  ngAfterViewInit() {
    this.superTabsCtrl.enableTabsSwipe(false);
  }

  onTabSelect(tab: { index: number; id: string; }) {
    this.pageIndex = tab.index;
  }

}
