import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { LoginUserDto } from './app/dto/login-user-dto';
import { RegisterUserDto } from './app/dto/register-user-dto';
import { UserRepository } from './database/repositories/users.repository';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    private readonly userRepository: UserRepository,

  ) { }

  async register(registerUserDto: RegisterUserDto) {
    const { email, password, name } = registerUserDto

    const emailAlreadyInUse = await this.userRepository.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new ConflictException('This email already in use');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userRepository.createUser({
      email,
      name,
      password: hashedPassword
    });

    const accessToken = await this.generateAccessToken(user.id);

    return {
      accessToken
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const accessToken = await this.generateAccessToken(user.id);

    return { accessToken };
  }

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token)
      return {
        userId: decoded.sub,
      }
    }
    catch {
      return { userId: null }
    }
  }

  private generateAccessToken(userId: string) {
    return this.jwtService.signAsync({
      sub: userId,
    });
  }
}
