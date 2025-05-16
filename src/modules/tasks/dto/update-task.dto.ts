import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @IsUUID()
  @IsOptional()
  userId?: string;
}