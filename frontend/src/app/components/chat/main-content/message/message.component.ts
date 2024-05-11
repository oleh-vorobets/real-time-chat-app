import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent {
  constructor(private userService: UserService) {}
  @Input() message: any;
  currentUser = this.userService.currentUser;
}
