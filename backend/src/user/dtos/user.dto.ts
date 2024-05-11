import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  initials?: string;
}
