import { Expose } from 'class-transformer';
import { IsString, IsDate, IsOptional } from 'class-validator';

export abstract class BaseEntityDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsDate()
  createdAt: Date;

  @Expose()
  @IsDate()
  updatedAt: Date;

  @Expose()
  @IsOptional()
  @IsDate()
  deletedAt?: Date;

  protected constructor(partial: Partial<BaseEntityDto>) {
    Object.assign(this, partial);
  }
}
