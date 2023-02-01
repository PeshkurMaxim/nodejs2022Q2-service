import { IsString } from 'class-validator';

export class UserDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly login: string;

  @IsString()
  readonly version: number;

  @IsString()
  readonly createdAt: number;

  @IsString()
  readonly updatedAt: number;
}
