import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @Expose()
  @IsString()
  @MinLength(3)
  @MaxLength(45)
  @IsDefined()
  @ApiProperty()
  firstName: string;

  @Expose()
  @IsString()
  @MinLength(3)
  @MaxLength(45)
  @IsDefined()
  @ApiProperty()
  lastName: string;

  @Expose()
  @IsEmail()
  @MaxLength(45)
  @IsDefined()
  @ApiProperty()
  email: string;
}
