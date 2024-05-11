import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = 'mail@mail.com';
  password = 'password';
  isInvalid = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private socketService: SocketService,
    private router: Router
  ) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        this.socketService.currentUser = response.user?._id; // ?
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
