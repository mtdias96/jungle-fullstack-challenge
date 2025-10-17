import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString({ message: 'O campo content deve ser uma string.' })
  @IsNotEmpty({ message: 'O campo content não pode estar vazio.' })
  @Length(1, 2000, { message: 'O campo content deve ter entre 1 e 2000 caracteres.' })
  content: string;
}
