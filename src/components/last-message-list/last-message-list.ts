import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat-service/chat-service';
import { Message } from "../../models/message/message.interface";
import { Profile } from '../../models/profile/profile.interface';
import { NavController } from 'ionic-angular';
import { LastMessage } from '../../models/last-message/last-message.interface';
import { AuthService } from '../../providers/auth-service/auth-service';


@Component({
  selector: 'last-message-list',
  templateUrl: 'last-message-list.html'
})
export class LastMessageListComponent implements OnInit {


  lastMessages$: Message[];
  lastMessages: LastMessage[];
  userId: string;

  constructor(private chat: ChatService,
    private auth: AuthService,
    private navCtrl: NavController) {
  }

  ngOnInit() {
    this.chat.getLastMessages().subscribe(lastMessages => {
      this.lastMessages$ = lastMessages;
      this.lastMessages = [];
      this.auth.getAuthenticatedUser().subscribe(user => {
        this.userId = user.uid;
        this.lastMessages$.forEach((eachLastMessage) => {
          if (eachLastMessage.userFromId === this.userId) { // current user has sent the last message
            this.lastMessages.push({
              otherUserFirstName: eachLastMessage.userToProfile.firstName,
              otherUserLastName: eachLastMessage.userToProfile.lastName,
              otherUserKey: eachLastMessage.userToId,
              content: eachLastMessage.content
            });
          } else { // current user has received the last message
            this.lastMessages.push({
              otherUserFirstName: eachLastMessage.userFromProfile.firstName,
              otherUserLastName: eachLastMessage.userFromProfile.lastName,
              otherUserKey: eachLastMessage.userFromId,
              content: eachLastMessage.content
            });
          }
        })
      });

    });
  }

  navigateToMessagePage(message: LastMessage) {


    const profile: Profile = {
      key: message.otherUserKey,
      firstName: message.otherUserFirstName,
      lastName: message.otherUserLastName
    };

    this.navCtrl.push('MessagePage', {
      profile: profile
    });
  }
}
