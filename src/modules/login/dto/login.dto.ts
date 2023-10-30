/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  readonly identity_document: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(60)
  @IsOptional()
  readonly username: string;

  @ApiProperty({
    required: true,
  })
  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    required: true,
  })
  @IsNumber()
  @Max(999999999)
  @IsOptional()
  readonly ttl?: number;
}