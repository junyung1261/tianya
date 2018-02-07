import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-community-board',
  templateUrl: 'community-board.html',
})
export class CommunityBoardPage {
  categoryName: any;
  categoryDBName: any;

  categoryRef: AngularFireList<any>;
  bullets = [];
  count = 10;
  lastKey = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public dataProvider: DataProvider,
    public modalCtrl: ModalController) {


    this.categoryName = (this.navParams.get('categoryName'));
    this.categoryDBName = '/community/' + this.categoryName;
    this.categoryRef = afDB.list(this.categoryDBName);


  }

  ionViewDidLoad() {
    this.dataProvider.getBullets(this.count, this.categoryDBName, '').snapshotChanges().take(1).subscribe(snapshots => {
      let bullets = [];
      snapshots.forEach(snap => {
        bullets.unshift({
          key: snap.payload.key,
          name: snap.payload.val().name,
          writer: snap.payload.val().writer,
          view: snap.payload.val().view,
          date: snap.payload.val().date,
          title: snap.payload.val().title,
          // like: snap.payload.val().like,
          // startTime: snap.payload.val().startTime,
          // image: snap.payload.val().image,
          // description: snap.payload.val().description,
          // imgProfile: snap.payload.val().imgProfile,
          // images: this.afDB.list(this.categoryDBName + '/' + snap.key + '/images').valueChanges().take(1),
        })
      })
      this.bullets = bullets;
      this.lastKey = bullets[bullets.length - 1].key;
    })
  }

  presentBoardModal(bullet) {

    console.log("bullet key : ", bullet.key)

    let createModal = this.modalCtrl.create('CommunityDetailPage',
      {
        categoryName: this.categoryName,
        bulletKey: bullet.key


        // give CommunityPromotionPage only key?  OR every data?
        // bulletTitle: bullet.title,
        // bulletDescription: bullet.description,
        // bulletDate = bullet.date,
        // bulletLike = bullet.like,
        // bulletComment = bullet.comment
      }, {
        enterAnimation: 'modal-slide-in',
        leaveAnimation: 'modal-slide-out'
      });
    createModal.onDidDismiss(data => {
      console.log('asdasd');
    });
    createModal.present();
  }

  presentCreateBoard(categoryName) {
    let createModal = this.modalCtrl.create('CommunityCreatePage', { categoryName: categoryName, userId: 8675309 }, {
      enterAnimation: 'modal-slide-in',
      leaveAnimation: 'modal-slide-out'
    });
    createModal.onDidDismiss(data => {
      console.log(data);
    });
    createModal.present();
  }



}