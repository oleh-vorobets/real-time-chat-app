import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(80, { cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer() server: Server;

  private userSockets = new Map<string, Socket>();

  @SubscribeMessage('join')
  handleJoin(client: Socket, userId: string): void {
    console.log(userId);
    this.userSockets.set(userId, client);
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, userId: string): void {
    this.userSockets.delete(userId);
  }

  @SubscribeMessage('message')
  handleMessage(
    client: Socket,
    payload: {
      senderId: string;
      receiverIds: string[];
      message: string;
      roomId: string;
    },
  ): void {
    for (let receiverId of payload.receiverIds) {
      const receiverSocket = this.userSockets.get(receiverId);
      if (receiverSocket && receiverId !== payload.senderId) {
        receiverSocket.emit('message', {
          senderId: payload.senderId,
          message: payload.message,
          roomId: payload.roomId,
        });
      }
    }
  }

  @SubscribeMessage('room')
  handleRoom(
    client: Socket,
    payload: {
      _id: string;
      users: string[];
      name: string;
    },
  ): void {
    console.log(payload);
    for (let userId of payload.users) {
      const user = this.userSockets.get(userId);
      if (user) {
        user.emit('room', payload);
      }
    }
  }
}
