import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'send-message-box',
  templateUrl: 'send-message-box.html'
})
export class SendMessageBoxComponent {

  message: string = "";
  @Output() sendMessage: EventEmitter<string>;

  constructor() {
    this.sendMessage = new EventEmitter<string>();
  } 

  send() {
    if (this.message) {
      this.sendMessage.emit(this.message);
      this.message = "";
    }
  }

}
