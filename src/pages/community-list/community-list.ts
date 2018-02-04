import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the CommunityListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-community-list',
  templateUrl: 'community-list.html',
})
export class CommunityListPage {

  categoryId: any;
  categoryName: any;
  categoryDBName: any;

  categoryRef: AngularFireList<any>;
  bullets = [];
  count = 10;
  lastKey = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController
  , public afDB: AngularFireDatabase, public dataProvider: DataProvider) {

    this.categoryName = (this.navParams.get('categoryName'));
    this.categoryDBName = '/community-' + this.categoryName
    console.log(this.categoryName);

    this.categoryRef = afDB.list(this.categoryDBName);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommunityListPage');
    this.dataProvider.getBullets(this.count, this.categoryDBName, '').snapshotChanges().take(1).subscribe(snapshots => {
      let bullets = [];
      snapshots.forEach(snap => {
        bullets.unshift({
          key: snap.payload.key, 
          name: snap.payload.val().name,
          image: snap.payload.val().image, 
          description: snap.payload.val().description, 
          imgProfile: snap.payload.val().imgProfile, 
          like: snap.payload.val().like, 
          date: snap.payload.val().date, 
          startTime: snap.payload.val().startTime, 
          title: snap.payload.val().title, 
          images: this.afDB.list(this.categoryDBName+ '/'+snap.key+'/images').valueChanges().take(1),
        })
        
      })
      
      this.bullets = bullets;
      this.lastKey = bullets[bullets.length-1].key;
      
    })
  }

  


  presentBoardModal(bullet) {
    let createModal = this.modalCtrl.create('CommunityPromotionPage', 
    {
      categoryName: this.categoryName,
      bulletKey: bullet.key
      
      // give CommunityPromotionPage only key?  OR every data?
      // bulletTitle: bullet.title,
      // bulletDescription: bullet.description,
      // bulletDate = bullet.date,
      // bulletLike = bullet.like,
      // bulletComment = bullet.comment
    } , {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      console.log('asdasd');
    });
    createModal.present();
  }

  presentCreateModal(categoryName) {
    let createModal = this.modalCtrl.create('CommunityCreatePage', { categoryName: categoryName, userId: 8675309 }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      console.log(data);
    });
    createModal.present();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.ionViewDidLoad();
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    
    console.log('Begin async operation');
    console.log(this.lastKey);
    setTimeout(() => {
    this.count+=1;
     this.dataProvider.getBullets(6,this.categoryDBName, this.lastKey).snapshotChanges().take(1).subscribe(snapshots => {
    let bullets = [];

    for(let i = 0 ; i < snapshots.length-1; i++){
      bullets.unshift({
        key: snapshots[i].payload.key, 
        name: snapshots[i].payload.val().name,
        image: snapshots[i].payload.val().image, 
        description: snapshots[i].payload.val().description, 
        imgProfile: snapshots[i].payload.val().imgProfile, 
        like: snapshots[i].payload.val().like, 
        date: snapshots[i].payload.val().date, 
        startTime: snapshots[i].payload.val().startTime, 
        title: snapshots[i].payload.val().title, 
        images: this.afDB.list('/feed/'+snapshots[i].key+'/images').valueChanges().take(1),
      })
    }
    
   
    for(let i = 0; i<bullets.length; i++){
      this.bullets.push(bullets[i]);
    }
    console.log(bullets);
   
    this.lastKey = bullets[bullets.length-1].key;
    console.log(this.lastKey);
    
  })
  
  
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  

}