import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { AuthService } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  existingProfile: Profile;

  constructor(private auth: AuthService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  navigateToEditProfilePage() {
    this.navCtrl.push('EditProfilePage', {
      existingProfile: this.existingProfile
    });
  }

  getExistingProfile(existingProfile: Profile) {
    this.existingProfile = existingProfile;
  }

  logOut() {
    this.auth.logOut();
    this.navCtrl.setRoot('LoginPage');
  }
}
