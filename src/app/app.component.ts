import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { DataService } from '../providers/data-service/data-service';

@Component({ 
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage: string;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private data: DataService,
    private auth: AuthService) {

    this.auth.getAuthenticatedUser().subscribe((user) => {

      if (!user) {
        this.rootPage = "LoginPage";
      }
      else {
        this.data.getProfile(user).subscribe((profile) => {
          profile ? this.rootPage = 'TabsPage' : this.rootPage = 'LoginPage';
        });
      }
    })
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

