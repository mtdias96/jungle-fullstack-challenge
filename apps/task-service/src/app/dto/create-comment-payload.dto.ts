import { Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';

export class CreateCommentPayloadDto {
  @ValidateNested()
  @Type(() => CreateCommentDto)
  data: CreateCommentDto;

  @IsUUID()
  userId: string;

  @IsUUID()
  taskId: string;
}
