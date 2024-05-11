import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { SocketService } from '../../../services/socket.service';
import { RoomService } from '../../../services/room.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from '../../../services/message.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css',
})
export class MainContentComponent implements OnInit, OnDestroy {
  constructor(
    private socketService: SocketService,
    private roomService: RoomService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  messages: any[] = [];
  rooms: any[] = [];
  currentUser: any;
  private messageSubscription: Subscription | null = null;
  private roomSubscription: Subscription | null = null;
  @Input('room') selectedRoom: any = null;
  selectedRoomUsers: any[] = [];
  @Output() notifySelectedRoom = new EventEmitter<any>();

  inputedMessage = '';

  onRoomClicked(room: any) {
    this.selectedRoom = room;
    this.selectedRoomUsers = [...room.users];
    this.messageService
      .getRoomMessages(this.selectedRoom._id)
      .subscribe((messages) => {
        this.messages = messages;
      });
    this.notifySelectedRoom.emit(this.selectedRoom);
  }

  ngOnInit() {
    this.socketService.message$.subscribe((message) => {
      if (this.selectedRoom && this.selectedRoom._id === message.roomId)
        this.messages.push(message);
    });

    this.roomSubscription = this.socketService.room$.subscribe((room) => {
      const index = this.rooms.findIndex((el) => el._id === room._id);
      if (index !== -1) {
        const updatedRooms = [...this.rooms];
        updatedRooms.splice(index, 1);
        this.rooms = updatedRooms;
        this.selectedRoomUsers = [...room.users];
      }
      const newRooms = [room, ...this.rooms];
      this.rooms = newRooms;
      this.onRoomClicked(room);
    });

    this.currentUser = this.authService.getCurrentUserInfo();

    if (this.currentUser._id)
      this.roomService.getUserRooms(this.currentUser._id).subscribe(
        (rooms) => {
          this.rooms = rooms;
          console.log('Rooms:', rooms);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  ngOnDestroy() {
    this.messageSubscription!.unsubscribe();
    this.roomSubscription!.unsubscribe();
  }

  @Output() notifyToNewRoom = new EventEmitter<boolean>();
  @Output() notifyToAddMember = new EventEmitter<boolean>();

  notifyToOpenNewRoom() {
    this.notifyToNewRoom.emit(true);
  }

  notifyToOpenAddMember() {
    this.notifyToAddMember.emit(true);
  }

  onSendMessage() {
    if (this.inputedMessage) {
      this.socketService.sendMessage(
        this.inputedMessage,
        this.currentUser._id,
        this.selectedRoom.users,
        this.selectedRoom._id
      );
      this.messageService
        .sendMessage(
          this.inputedMessage,
          this.currentUser._id,
          this.selectedRoom._id
        )
        .subscribe((message) => this.messages.push(message));
      this.inputedMessage = '';
    }
  }
}
