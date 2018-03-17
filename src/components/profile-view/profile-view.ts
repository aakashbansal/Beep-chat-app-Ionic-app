import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../providers/auth-service/auth-service';
import { DataService } from '../../providers/data-service/data-service';
import { User } from 'firebase/app';
import { Profile } from '../../models/profile/profile.interface';
import { Loading, LoadingController } from 'ionic-angular';

@Component({
  selector: 'profile-view',
  templateUrl: 'profile-view.html'
})
export class ProfileViewComponent implements OnInit {

  public userProfile: Profile;
  private loader: Loading;

  @Output() existingProfile: EventEmitter<Profile>;

  constructor(private loadCtrl: LoadingController,
    private auth: AuthService,
    private data: DataService) {

    this.existingProfile = new EventEmitter<Profile>();
    this.loader = this.loadCtrl.create({
      content: "Loading Profile..."
    });
  }

  ngOnInit() {
    this.loader.present();
    this.data.getAuthenticatedUserProfile().subscribe((profile:any) => {
      this.userProfile = profile.payload;
      this.loader.dismiss();
      this.existingProfile.emit(this.userProfile);
    });


  }

}
