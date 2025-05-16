import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}