import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Channel } from '../../models/channel/channel.interface';
import { Observable } from 'rxjs/Observable';
import { ChannelMessage } from '../../models/channel/channel-message.interface';
import { ChatService } from '../../providers/chat-service/chat-service';

@IonicPage()
@Component({
  selector: 'page-channel-chat',
  templateUrl: 'channel-chat.html',
})
export class ChannelChatPage {

  channel: Channel;
  channelChatList$: Observable<ChannelMessage[]>;
  channelChatList: ChannelMessage[];

  constructor(public chat: ChatService,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.channel = this.navParams.get('channel');
    this.channelChatList$ = this.chat.getChannelChatRef(this.channel.$key);
    this.channelChatList$.subscribe((channelChatList) => {
      this.channelChatList = channelChatList;
    })

  }

  sendMessage(message: string) {

    let channelMessage: ChannelMessage = {
      content: message
    };

    this.chat.sendMessageToChannel(this.channel.$key, channelMessage);
  }

}
