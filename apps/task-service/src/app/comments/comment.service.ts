import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from 'src/database/entities/tasks.entity';
import { CommentTaskRepository } from 'src/database/repositories/comment.repository';
import { TaskRepository } from 'src/database/repositories/task.repository';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentTaskService {

  constructor(
    private readonly tasksRepository: TaskRepository,
    private readonly commentTaskRepo: CommentTaskRepository
  ) { }

  async createComment(payload: { data: CreateCommentDto; userId: string; taskId: string }) {
    const { data, userId, taskId } = payload;

    const taskExists = await this.tasksRepository.findById(taskId);
    if (!taskExists) throw new NotFoundException('Task not found');

    return await this.commentTaskRepo.commentTask({
      authorId: userId,
      task: { id: taskId } as Task,
      content: data.content,
    });
  }

  async listComments(page = 1, size = 10, taskId: string) {
    const [tasks, total] = await this.commentTaskRepo.findAll(page, size, taskId);
    return { tasks, total, page, size };
  }
}
