import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Bài này hay quá!',
    description: 'Nội dung comment của bạn',
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Tên người comment',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'a@example.com',
    description: 'Email người comment',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '0123456789',
    description: 'Số điện thoại người comment',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;
}