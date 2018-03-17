import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginResponse } from '../../models/login-response/login-response.interface';
import { ToastController } from 'ionic-angular';
import { DataService } from '../../providers/data-service/data-service';
import { User } from 'firebase/app';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private navCtrl: NavController,
    private data: DataService,
    private toast: ToastController, ) {
  }

  login(event: LoginResponse) {    
    if (!event.error) {  
      this.toast.create({
        message: `Welcome to Beep , ${event.result.email} `,
        duration: 3000
      }).present();

      this.data.getProfile(<User>event.result).subscribe((profile) => {
        profile ? this.navCtrl.setRoot('TabsPage') : this.navCtrl.setRoot('EditProfilePage');
      });

    } else {
      this.toast.create({
        message: event.error.message,
        duration: 3000
      }).present();
    }
  }
}
