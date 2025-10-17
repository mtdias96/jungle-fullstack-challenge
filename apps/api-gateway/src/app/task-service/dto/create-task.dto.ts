import {
  IsDateString,
  IsEnum,
  IsOptional, IsString,
  IsUUID,
  Length
} from 'class-validator';

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  DONE = 'DONE',
}

export class CreateTaskDto {
  @IsString()
  @Length(3, 100)
  title: string;

  @IsOptional()
  @IsString()
  description!: string;

  @IsOptional()
  @IsDateString()
  time!: string;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority!: TaskPriority;

  @IsOptional()
  @IsEnum(TaskStatus)
  status!: TaskStatus;

  @IsUUID()
  userId: string;
}
