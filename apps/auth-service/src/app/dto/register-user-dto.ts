import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsString()
  password!: string;
}



export class AuthResponseDto {
  @IsString()
  token: string;

  @IsString()
  userId: string;
}