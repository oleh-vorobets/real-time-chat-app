import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { MongooseModule } from '@nestjs/mongoose';
import { roomSchema } from './schema/room.schema';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Room', schema: roomSchema }]),
    UserModule,
  ],
  controllers: [RoomController],
  providers: [RoomService, JwtAuthGuard],
  exports: [RoomService],
})
export class RoomModule {}
