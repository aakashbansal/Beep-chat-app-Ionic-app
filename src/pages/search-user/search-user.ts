import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search-user',
  templateUrl: 'search-user.html',
})
export class SearchUserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  } 
   
  goToMessagePage(profile) {
    this.navCtrl.push('MessagePage', {
      profile: profile
    })
  }
}
