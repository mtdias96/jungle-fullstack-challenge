import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './app/comments/comment.controller';
import { CommentTaskService } from './app/comments/comment.service';
import { TaskController } from './app/task/task.controller';
import { TaskService } from './app/task/task.service';
import { DatabaseModule } from './database/database.module';
import { typeOrmConfig } from './database/typeorm.config';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],

  controllers: [TaskController, CommentController],
  providers: [TaskService, CommentTaskService]
})
export class AppModule { }
