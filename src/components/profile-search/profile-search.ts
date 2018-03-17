import { Component, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../providers/data-service/data-service';
import { Profile } from '../../models/profile/profile.interface';

@Component({
  selector: 'profile-search',
  templateUrl: 'profile-search.html'
})
export class ProfileSearchComponent {

  query: string;
  profileList: Profile[];
  @Output() selectedProfile: EventEmitter<Profile>;

  constructor(private data: DataService) {
    this.selectedProfile = new EventEmitter<Profile>();
  }

  selectProfile(profile: Profile) {
    this.selectedProfile.emit(profile)
  }

  searchUser() {

    const trimmedQuery: string = this.query.trim();

    if (trimmedQuery === this.query) {

      this.data.searchUser(this.query).subscribe((profiles) => {

        this.profileList = [];

        profiles.forEach((eachProfile) => {
          this.profileList.push({
            firstName: eachProfile.payload.val().firstName,
            lastName: eachProfile.payload.val().lastName,
            email: eachProfile.payload.val().email,
            dateOfBirth: eachProfile.payload.val().dateOfBirth,
            key: eachProfile.key
          });
        })
        
      })
    }
  }

}
