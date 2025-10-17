import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthGuard } from '../guards/auth/auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskServiceController {
  constructor(
    @Inject('TASK-SERVICE') private readonly tasksClient: ClientProxy,
  ) { }

  @Post()
  async create(@Body() dto: CreateTaskDto, @Req() req) {
    const userId = req.user.userId;
    const response$ = this.tasksClient.send('task.create', {
      data: dto,
      userId,
    });
    return await firstValueFrom(response$);
  }

  @Post(':id/comments')
  async createComment(
    @Body() dto: CreateCommentDto,
    @Param('id') taskId: string,
    @Req() req) {
    const userId = req.user.userId;
    const response$ = this.tasksClient.send('task.create.comment', {
      data: dto,
      userId,
      taskId
    });

    return await firstValueFrom(response$);
  }

  @Get()
  async findAll(
    @Query('page') page = 1, @Query('size') size = 10) {
    const response$ = this.tasksClient.send('task.findAll', {
      page: Number(page),
      size: Number(size),
    });
    return await firstValueFrom(response$);
  }

  @Get(':id/comments')
  async findAllComment(
    @Param('id') taskId: string,
    @Query('page') page = 1, @Query('size') size = 10) {
    const response$ = this.tasksClient.send('task.comment.findComments', {
      page: Number(page),
      size: Number(size),
      taskId
    });

    return await firstValueFrom(response$);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response$ = this.tasksClient.send('task.findOne', { id });
    return await firstValueFrom(response$);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @Req() req,
  ) {
    const userId = req.user.userId;
    const response$ = this.tasksClient.send('task.update', {
      id,
      data: dto,
      userId,
    });
    return await firstValueFrom(response$);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    const userId = req.user.userId;
    const response$ = this.tasksClient.send('task.delete', { id, userId });
    return await firstValueFrom(response$);
  }
}
