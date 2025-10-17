import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentTaskRepository {
  constructor(
    @InjectRepository(Comment) private readonly commentTaskRepo: Repository<Comment>,
  ) { }

  commentTask(taskData: Partial<Comment>) {
    const task = this.commentTaskRepo.create(taskData);
    return this.commentTaskRepo.save(task);
  }

  findAll(page = 1, size = 10, taskId: string) {
    return this.commentTaskRepo.findAndCount({
      where: { task: { id: taskId } },
      skip: (page - 1) * size,
      take: size,
      order: { createdAt: 'DESC' },
    });
  }
}
