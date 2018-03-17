import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { Message } from '../../models/message/message.interface';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DataService } from '../../providers/data-service/data-service';
import { ChatService } from '../../providers/chat-service/chat-service';


@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  receiverProfile: Profile;
  senderProfile: Profile;
  chatList: Message[];
  senderId: string;

  constructor(private auth: AuthService,
    private chat: ChatService,
    private data: DataService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillLoad() {
    const profile = this.navParams.get('profile');

    this.receiverProfile = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      key: profile.key
    };

    this.data.getAuthenticatedUserProfile().subscribe(profile => {
      this.senderProfile = profile.payload;
      this.senderId = profile.key;
    });

    this.getChats();
  }

  sendMessage(content: string) {
    let message: Message = {
      userFromId: this.senderId,
      userFromProfile: {
        firstName: this.senderProfile.firstName,
        lastName: this.senderProfile.lastName
      }, 
      userToId: this.receiverProfile.key,
      userToProfile: {
        firstName: this.receiverProfile.firstName,
        lastName: this.receiverProfile.lastName
      },
      content: content
    };

    this.chat.sendChatMessage(message);
  }

  getChats() {
    this.chat.getChats(this.receiverProfile.key).subscribe(chats => {
      this.chatList = chats;
    })
  }

}
