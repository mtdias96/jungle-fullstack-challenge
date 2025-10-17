import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/tasks.entity';

@Injectable()
export class TaskRepository {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) { }

  createTask(taskData: Partial<Task>) {
    const task = this.taskRepo.create(taskData);
    return this.taskRepo.save(task);
  }

  findAll(page = 1, size = 10) {
    return this.taskRepo.findAndCount({
      skip: (page - 1) * size,
      take: size,
      order: { createdAt: 'DESC' },
    });
  }

  findById(id: string) {
    return this.taskRepo.findOneBy({ id });
  }

  async updateTask(id: string, data: Partial<Task>) {
    await this.taskRepo.update(id, data);
    return this.findById(id);
  }

  async deleteTask(id: string) {
    await this.taskRepo.delete(id);
  }
}
