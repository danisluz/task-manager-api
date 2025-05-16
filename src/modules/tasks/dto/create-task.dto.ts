import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @ApiProperty({ example: 'Estudar NestJS', description: 'Título da tarefa' })
  title: string;

  @IsString()
  @ApiProperty({ example: 'Aprender como integrar Swagger', description: 'Descrição da tarefa' })
  description: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: false, description: 'Status da tarefa (concluída ou não)' })
  done?: boolean;

  @IsUUID()
  @ApiProperty({ example: 'ID do Usuário que esta criando a tarefa', description: 'UUID' })
  userId: string;
}