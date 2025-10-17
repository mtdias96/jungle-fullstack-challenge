import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from 'src/database/entities/tasks.entity';
import { CommentTaskRepository } from 'src/database/repositories/comment.repository';
import { TaskRepository } from 'src/database/repositories/task.repository';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskService {

  constructor(
    private readonly tasksRepository: TaskRepository,
    private readonly commentTaskRepo: CommentTaskRepository
  ) { }

  async createTask(dto: CreateTaskDto, creatorId: string) {
    const deadline = dto.deadline ? new Date(dto.deadline) : null;

    const task = await this.tasksRepository.createTask({
      title: dto.title,
      description: dto.description,
      deadline,
      priority: dto.priority,
      status: dto.status,
      creatorId,
      assignedUsers: dto.assigneeIds ?? []
    });

    return { task }
  }

  async findAll(page = 1, size = 10) {
    const [tasks, total] = await this.tasksRepository.findAll(page, size);
    return { tasks, total, page, size };
  }

  async findOne(id: string) {
    const task = await this.tasksRepository.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async updateTask(id: string, dto: UpdateTaskDto) {
    const existing = await this.tasksRepository.findById(id);
    if (!existing) throw new NotFoundException('Task not found');

    const updatedPayload: any = { ...dto };
    if (dto.deadline !== undefined) {
      updatedPayload.deadline = dto.deadline ? new Date(dto.deadline as string) : null;
    }

    await this.tasksRepository.updateTask(id, updatedPayload as Task);
    const updated = await this.tasksRepository.findById(id);

    return updated;
  }

  // DELETE
  async removeTask(id: string) {
    const task = await this.tasksRepository.findById(id);
    if (!task) throw new NotFoundException('Task not found');

    await this.tasksRepository.deleteTask(id);

    return { deleted: true };
  }

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
