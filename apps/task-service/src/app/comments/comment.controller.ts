import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateCommentPayloadDto } from '../dto/create-comment-payload.dto';
import { CommentTaskService } from './comment.service';


@Controller()
export class CommentController {
  constructor(private readonly commentTaskService: CommentTaskService) { }

  @MessagePattern('task.create.comment')
  async createComment(@Payload() payload: CreateCommentPayloadDto) {
    return this.commentTaskService.createComment(payload);
  }

  @MessagePattern('task.comment.findComments')
  async findAllComment(@Payload() payload: { page?: number; size?: number, taskId: string }) {
    return this.commentTaskService.listComments(payload.page, payload.size, payload.taskId);
  }

}
