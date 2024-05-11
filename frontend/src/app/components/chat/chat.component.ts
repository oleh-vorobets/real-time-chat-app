import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  isAddRoomChatOpen = false;
  isAddMemberOpen = false;
  selectedRoom: any;

  onSelectedRoom(room: any) {
    this.selectedRoom = room;
  }
}
