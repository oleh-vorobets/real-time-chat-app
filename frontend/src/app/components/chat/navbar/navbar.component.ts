import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private location: Location
  ) {}
  isUserSettingsOpen = false;
  currentUserName = this.userService.currentUser?.initials;

  onLogout() {
    this.authService.logout();
    window.location.reload();
  }
}
