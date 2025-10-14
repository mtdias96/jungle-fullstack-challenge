import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SignInDto, SignUpDto } from '../dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(
    @Inject("AUTH-SERVICE") private readonly authClient: ClientProxy
  ) { }
  @Post('register')
  async register(@Body() signupDto: SignUpDto) {
    return await firstValueFrom(this.authClient.send("auth-register", signupDto))
  }

  @Post('login')
  async login(@Body() signInDto: SignInDto) {
    return await firstValueFrom(this.authClient.send("auth-login", signInDto))
  }
}
