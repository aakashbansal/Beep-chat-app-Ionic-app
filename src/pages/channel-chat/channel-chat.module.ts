import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelChatPage } from './channel-chat';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ChannelChatPage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelChatPage),
    ComponentsModule
  ],
})
export class ChannelChatPageModule {}
