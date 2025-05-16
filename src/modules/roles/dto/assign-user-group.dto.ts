import { IsString, IsNotEmpty } from 'class-validator';

export class AssignUserGroupDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  groupId: string;
}
