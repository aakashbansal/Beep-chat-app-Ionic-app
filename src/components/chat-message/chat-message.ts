import { Component, Input } from '@angular/core';
import { Message } from '../../models/message/message.interface';

@Component({
  selector: 'chat-message',
  templateUrl: 'chat-message.html'
})
export class ChatMessageComponent {

  @Input() message: Message;
  @Input() senderId: string;

  constructor() {

  }

}
