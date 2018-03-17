import { Component, OnDestroy, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';
import { DataService } from '../../providers/data-service/data-service';
import { AuthService } from '../../providers/auth-service/auth-service';
import { User } from 'firebase/app';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'edit-profile-form',
  templateUrl: 'edit-profile-form.html'
})
export class EditProfileFormComponent implements OnDestroy, OnInit {

  @Input() profile: Profile;
  @Output() saveProfileResult: EventEmitter<boolean>;

  private authenticatedUser$: Subscription;
  private authenticatedUser: User;

  constructor(private auth: AuthService,
    private data: DataService) {

    this.saveProfileResult = new EventEmitter<boolean>();
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
      this.authenticatedUser = user;
    });


  }

  ngOnInit() {
    if (!this.profile) {
      this.profile = {} as Profile;
    }
  }
  async saveProfile() {
    if (this.authenticatedUser) {
      this.profile.email = this.authenticatedUser.email;
      this.profile.firstName = this.profile.firstName.trim();
      const result: boolean = await this.data.saveProfile(this.authenticatedUser, this.profile);
      this.saveProfileResult.emit(result);
    }


  }

  ngOnDestroy(): void {
    this.authenticatedUser$.unsubscribe();
  }

}
