import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { SocketService } from '../../../../services/socket.service';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrl: './chat-item.component.css',
})
export class ChatItemComponent {
  @Output() notifyUserClicked = new EventEmitter<string>();

  @Input() item: any;

  @ViewChild('userItem', { static: true }) userItemRef: ElementRef | null =
    null;

  isUserClicked = false;

  emitUserClicked() {
    this.notifyUserClicked.emit(this.item._id);
    this.toggleUserClass();
  }

  toggleUserClass() {
    this.isUserClicked = !this.isUserClicked;
    const userItemElement = this.userItemRef!.nativeElement;
    userItemElement.classList.toggle('user-clicked', this.isUserClicked);
  }
}
