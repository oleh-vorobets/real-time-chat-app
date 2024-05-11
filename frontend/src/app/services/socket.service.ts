import { Injectable, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';

@Injectable()
export class SocketService implements OnDestroy {
  currentUser: any; // probably error is here

  private messageSubject = new Subject<any>();
  message$ = this.messageSubject.asObservable();

  private roomSubject = new Subject<any>();
  room$ = this.roomSubject.asObservable();

  constructor(private socket: Socket) {}

  onJoin(id: string) {
    console.log(id);
    this.socket.emit('join', id);

    this.socket.on('message', (payload: any) => {
      this.messageSubject.next(payload);
    });

    this.socket.on('room', (payload: any) => {
      this.roomSubject.next(payload);
    });
  }

  sendMessage(
    message: string,
    senderId: string,
    receiverIds: string[],
    roomId: string
  ): void {
    this.socket.emit('message', {
      senderId,
      message,
      receiverIds,
      roomId,
    });
  }

  sendRoom(roomId: any, roomUsers: string[], roomName: string): void {
    this.socket.emit('room', {
      _id: roomId,
      users: roomUsers,
      name: roomName,
    });
  }

  ngOnDestroy(): void {
    this.socket.emit('leave', this.currentUser?._id);
  }
}
