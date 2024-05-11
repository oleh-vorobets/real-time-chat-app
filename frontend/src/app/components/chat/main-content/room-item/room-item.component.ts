import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrl: './room-item.component.css',
})
export class RoomItemComponent {
  @Input() room: any;
  @Output() selectedRoom = new EventEmitter<any>();
  @Input() isClicked: boolean = false;

  onRoomClicked() {
    this.selectedRoom.emit(this.room);
  }
}
