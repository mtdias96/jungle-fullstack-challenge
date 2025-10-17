import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Task } from './entities/tasks.entity';
import { CommentTaskRepository } from './repositories/comment.repository';
import { TaskRepository } from './repositories/task.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Comment])

  ],
  providers: [TaskRepository, CommentTaskRepository],
  exports: [TaskRepository, CommentTaskRepository],
})
export class DatabaseModule { }
