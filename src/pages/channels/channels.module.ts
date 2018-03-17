import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelsPage } from './channels';

@NgModule({
  declarations: [
    ChannelsPage,
  ],
  imports: [
    IonicPageModule.forChild(ChannelsPage),
  ],
})
export class ChannelsPageModule {}
