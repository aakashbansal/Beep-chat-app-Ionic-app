import { Component, OnInit } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';
import { OnlineUserService } from '../../providers/online-user-service/online-user-service';
import { DataService } from '../../providers/data-service/data-service';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'online-users',
  templateUrl: 'online-users.html'
})
export class OnlineUsersComponent implements OnInit {

  onlineUsers: Profile[]=[];

  constructor(private online: OnlineUserService,
    private navCtrl: NavController,
    private data: DataService) {

  }

  ngOnInit() {
    this.setUserOnline();
    this.getOnlineUsersList(); 
  }

  setUserOnline() {
    this.data.getAuthenticatedUserProfile().subscribe((profile) => {
      this.online.setUserOnline(profile);
    })
  } 

  getOnlineUsersList() {
    this.online.getOnlineUsersList().subscribe((onlineUsers) => {
      this.onlineUsers = [];
      onlineUsers.forEach((eachOnlineUser) => {
        this.onlineUsers.push({
          firstName: eachOnlineUser.payload.val().firstName,
          lastName: eachOnlineUser.payload.val().lastName,
          email: eachOnlineUser.payload.val().email,
          dateOfBirth: eachOnlineUser.payload.val().dateOfBirth,
          key: eachOnlineUser.key
        });
      })
    })
  }

  openChat(profile) {
    this.navCtrl.push('MessagePage', {
      profile: profile
    });
  }

}
