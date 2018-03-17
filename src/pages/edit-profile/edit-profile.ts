import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  existingProfile: Profile;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.existingProfile = this.navParams.get("existingProfile");
  }


  saveProfileResult(event: boolean) {
    event ? this.navCtrl.setRoot('TabsPage') : console.log("Not authorised or saved");
  }

}
