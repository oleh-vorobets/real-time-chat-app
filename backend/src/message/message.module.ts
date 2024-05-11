import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { messageSchema } from './schema/message.schema';
import { RoomModule } from 'src/room/room.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: messageSchema }]),
    RoomModule,
  ],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
