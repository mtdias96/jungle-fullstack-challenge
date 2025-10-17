import { IsString, IsUUID, Length } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  taskId: string;

  @IsString()
  @Length(1, 2000)
  content: string;
}
