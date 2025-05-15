import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @IsUUID()
  userId: string;
}