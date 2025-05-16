import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Estudar NestJS', description: 'Título da tarefa' })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty()
  done?: boolean;

  @IsUUID()
  @IsOptional()
  @ApiProperty()
  userId?: string;
}