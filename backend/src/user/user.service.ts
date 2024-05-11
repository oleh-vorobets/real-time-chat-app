import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/types/user.type';
import { UserDto } from './dtos/user.dto';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { Students } from 'src/models/students.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectRepository(Students)
    private studentsRepository: Repository<Students>,
  ) {}

  async create(registerDto: UserDto) {
    const { initials, email } = registerDto;
    const isStudentExist = await this.isStudentExist(initials);
    if (!isStudentExist) {
      throw new HttpException(
        `User doesn't exist in the table!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMailExist = await this.isMailExist(email);
    if (isMailExist) {
      throw new HttpException(
        'User already exists with such email!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdUser = await new this.userModel(registerDto).save();
    return createdUser.toObject();
  }

  async addRoom(roomId: string | Types.ObjectId, userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new HttpException(
        'User can not be added to room!',
        HttpStatus.BAD_REQUEST,
      );
    }
    //@ts-ignore
    if (!user.rooms.includes(roomId)) {
      // FIX
      //@ts-ignore
      user.rooms.push(roomId);
    }
    return await user.save();
  }

  async findUserByLogin(userDto: UserDto) {
    const { email, password } = userDto;
    const user = await this.findByEmail(email);
    if (!user) {
      throw new HttpException(
        'User with such email was not found!',
        HttpStatus.NOT_FOUND,
      );
    }

    if (await compare(password, user.password)) {
      return user.toObject();
    } else {
      throw new HttpException('Invalid credential!', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    const users = await this.userModel.find();
    const sanitizedUsers = [];
    for (let user of users) {
      sanitizedUsers.push(this.sanitizeUser(user.toObject()));
    }
    return sanitizedUsers;
  }

  private async isMailExist(email: string): Promise<boolean> {
    return await this.userModel.findOne({ email });
  }

  private async isStudentExist(initials: string): Promise<boolean> {
    const [name, surname] = initials.split(' ');
    return !!(await this.studentsRepository.findOneBy({
      first_name: name,
      last_name: surname,
    }));
  }

  public async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  public async findById(id: Types.ObjectId | string | number) {
    return await this.userModel.findById(id);
  }

  async findByPayload({ email }: UserDto) {
    return await this.userModel.findOne({ email });
  }

  sanitizeUser(user: UserDto) {
    if (user.password) {
      delete user.password;
    }
    return user;
  }
}
