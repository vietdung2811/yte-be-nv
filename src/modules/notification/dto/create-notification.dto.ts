import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Email address to subscribe',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Optional name of the subscriber',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;
}
