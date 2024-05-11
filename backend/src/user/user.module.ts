import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/user/schema/user.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from 'src/models/students.model';
import { UserController } from './user.controller';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    TypeOrmModule.forFeature([Students]),
  ],
  providers: [UserService, JwtAuthGuard],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
