import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { RoomService } from '../../../services/room.service';
import { SocketService } from '../../../services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.css',
})
export class AddMemberComponent implements OnInit {
  @Output() notifyToClose = new EventEmitter<boolean>();
  @Output() notifyAddedMember = new EventEmitter<any>();
  @Input() room: any;

  users: any[] = [];
  potentialRoomMembers: any[] = [];

  constructor(
    private userService: UserService,
    private roomService: RoomService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    const users = this.userService
      .getAllUsers()
      .subscribe((response: any[]) => {
        this.users = response.filter(
          (user) => !this.room.users.includes(user._id)
        );
      });
    this.potentialRoomMembers = [...this.room.users];
  }

  onCloseModal() {
    this.notifyToClose.emit(false);
  }

  addMember() {
    if (this.potentialRoomMembers.length > 1) {
      this.roomService
        .addMembers(this.room._id, this.potentialRoomMembers)
        .subscribe(
          (room: any) => {
            this.socketService.sendRoom(room._id, room.users, room.name);
            this.notifyAddedMember.emit(room);
          },
          (err: any) => console.log(err)
        );
      this.onCloseModal();
    }
  }

  userClicked(userId: string) {
    const index = this.potentialRoomMembers.indexOf(userId);
    if (index !== -1) {
      this.potentialRoomMembers.splice(index, 1);
    } else {
      this.potentialRoomMembers.push(userId);
    }
  }
}
