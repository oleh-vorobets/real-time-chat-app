import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  isInvalid = false;
  email = '';
  initials = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private socketService: SocketService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.signup(this.email, this.password, this.initials).subscribe(
      (response) => {
        this.socketService.currentUser = response.user?._id;
        this.socketService.onJoin(response.user?._id);
        this.authService.setCookie('jwt', response.token);
        this.router.navigate(['/']);
      },
      (error) => {
        this.isInvalid = true;
        this.errorMessage = error;
      }
    );
  }
}
