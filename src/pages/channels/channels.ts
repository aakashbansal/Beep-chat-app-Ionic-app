import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChatService } from '../../providers/chat-service/chat-service';
import { Observable } from 'rxjs/Observable';
import { Channel } from '../../models/channel/channel.interface';
import { AngularFireList } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-channels',
  templateUrl: 'channels.html',
})
export class ChannelsPage {

  channelsList$: AngularFireList<Channel>;
  channelsList: Channel[] = [];

  constructor(private alertCtrl: AlertController,
    private chat: ChatService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.getChannels();
  }

  getChannels() {
    this.channelsList$ = this.chat.getChannelListRef();

    this.channelsList$.snapshotChanges().subscribe((channelsResponse) => {

      this.channelsList = [];

      channelsResponse.forEach((eachChannel) => {

        this.channelsList.push({
          name: eachChannel.payload.val().name,
          $key: eachChannel.key
        })
      });
    });

  }

  goToChannel(channel: Channel) {
    this.navCtrl.push('ChannelChatPage', {
      channel: channel
    })
  }

  showAddChannelDialog() {

    this.alertCtrl.create({
      title: 'Add Channel',
      inputs: [{
        name: 'channelName'
      }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            if (data.channelName.trim() !== "") {
              this.chat.createNewChannel(data.channelName);
            }
          }
        }
      ]
    }).present();

  }
}
