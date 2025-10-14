import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserRepository } from './database/repositories/users.repository';
import { typeOrmConfig } from './database/typeorm.config';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: 'teste',
      signOptions: {
        expiresIn: "7d"
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
