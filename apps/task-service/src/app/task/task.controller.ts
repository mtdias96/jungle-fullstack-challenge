import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateTaskDto } from '../dto/create-task.dto';

import { CreateCommentPayloadDto } from '../dto/create-comment-payload.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @MessagePattern('task.create')
  async create(@Payload() payload: { data: CreateTaskDto; userId: string }) {
    return this.taskService.createTask(payload.data, payload.userId);
  }

  @MessagePattern('task.create.comment')
  async createComment(@Payload() payload: CreateCommentPayloadDto) {
    return this.taskService.createComment(payload);
  }

  @MessagePattern('task.findAll')
  async findAll(@Payload() payload: { page?: number; size?: number }) {
    return this.taskService.findAll(payload.page ?? 1, payload.size ?? 10);
  }

  @MessagePattern('task.comment.findComments')
  async findAllComment(@Payload() payload: { page?: number; size?: number, taskId: string }) {
    return this.taskService.listComments(payload.page, payload.size, payload.taskId);
  }

  @MessagePattern('task.findOne')
  async findOne(@Payload() payload: { id: string }) {
    return this.taskService.findOne(payload.id);
  }

  @MessagePattern('task.update')
  async update(@Payload() payload: { id: string; data: UpdateTaskDto; userId: string }) {
    return this.taskService.updateTask(payload.id, payload.data);
  }

  @MessagePattern('task.delete')
  async remove(@Payload() payload: { id: string; userId: string }) {
    return this.taskService.removeTask(payload.id);
  }


}
