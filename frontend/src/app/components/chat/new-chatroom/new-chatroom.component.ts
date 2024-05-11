import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { RoomService } from '../../../services/room.service';
import { SocketService } from '../../../services/socket.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-new-chatroom',
  templateUrl: './new-chatroom.component.html',
  styleUrl: './new-chatroom.component.css',
})
export class NewChatroomComponent implements OnInit {
  @Output() notifyToClose = new EventEmitter<boolean>();

  room = '';
  rooms = [];
  potentialRoomMembers: string[] = [];

  constructor(
    private userService: UserService,
    private roomService: RoomService,
    private socketService: SocketService,
    private authService: AuthService
  ) {}

  onCloseModal() {
    this.notifyToClose.emit(false);
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.rooms = response.filter(
          (user: any) => !this.potentialRoomMembers.includes(user._id)
        );
      },
      (error) => {
        console.log(error);
      }
    );

    this.potentialRoomMembers = [this.socketService.currentUser];
    // this.roomService;
  }

  createRoom(): void {
    if (this.room && this.potentialRoomMembers.length > 1) {
      console.log(this.room, this.potentialRoomMembers);
      this.roomService
        .createRoom(this.room, this.potentialRoomMembers)
        .subscribe(
          (roomId) => {
            this.socketService.sendRoom(
              roomId,
              this.potentialRoomMembers,
              this.room
            );
          },
          (error) => {
            console.log(error);
          }
        );
      this.onCloseModal();
    }
  }

  userClicked(userId: any) {
    const index = this.potentialRoomMembers.indexOf(userId);
    if (index !== -1) {
      this.potentialRoomMembers.splice(index, 1);
    } else {
      this.potentialRoomMembers.push(userId);
    }
  }
}
