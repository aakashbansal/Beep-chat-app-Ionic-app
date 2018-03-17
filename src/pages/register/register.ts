import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { LoginResponse } from '../../models/login-response/login-response.interface';
import { ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(private navCtrl: NavController, private toast: ToastController) {

  }


  register(event: LoginResponse) {
    if (!event.error) {
      this.toast.create({
        message: `Account created : ${event.result.email}`,
        duration: 3000
      }).present(); 

      this.navCtrl.setRoot('LoginPage'); 
    } else {
      this.toast.create({
        message: event.error.message,
        duration: 3000
      }).present();
    }


  }

} 
