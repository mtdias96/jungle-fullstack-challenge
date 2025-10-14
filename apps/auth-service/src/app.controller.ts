import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { LoginUserDto } from './app/dto/login-user-dto';
import { RegisterUserDto } from './app/dto/register-user-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern('auth-register')
  async register(@Payload() signUpDto: RegisterUserDto) {
    return this.appService.register(signUpDto)
  }

  @MessagePattern('auth-login')
  async login(@Payload() loginUserDto: LoginUserDto) {
    return this.appService.login(loginUserDto)
  }

  @MessagePattern('validate-token')
  async validateToken(@Payload() token: string) {
    return this.appService.validateToken(token)
  }
}
