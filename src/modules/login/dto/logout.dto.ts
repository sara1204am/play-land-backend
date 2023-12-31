/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LogoutDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Access Token',
  })
  readonly token: string;
}
