import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditProfilePage } from './edit-profile';
import { ComponentsModule } from '../../components/components.module';
  
@NgModule({
  declarations: [
    EditProfilePage
  ],
  imports: [
    IonicPageModule.forChild(EditProfilePage),
    ComponentsModule
  ],
})
export class EditProfilePageModule { }
