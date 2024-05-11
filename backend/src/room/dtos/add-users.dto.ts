import { IsArray, IsNotEmpty } from 'class-validator';

export class AddUsersDto {
  @IsNotEmpty()
  @IsArray()
  users: string[];
}
