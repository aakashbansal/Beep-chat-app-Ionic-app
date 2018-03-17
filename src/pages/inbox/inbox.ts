import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-inbox', 
  templateUrl: 'inbox.html',
})
export class InboxPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  navigateToSearchUserPage(){
    this.navCtrl.push('SearchUserPage');
  }

}
