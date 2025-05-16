import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsArray()
  @IsOptional()
  roleIds?: string[];
}
