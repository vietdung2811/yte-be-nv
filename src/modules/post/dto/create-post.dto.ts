import { IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'How AI is Transforming Healthcare',
    description: 'Tiêu đề của bài viết',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Dr. Strange',
    description: 'Tên tác giả của bài viết',
  })
  @IsString()
  author: string;

  @ApiProperty({
    example: 'Let\'s talk AI and medicine.',
    description: 'Nội dung bài viết',
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: ['64dca12ffeb4b9a31b4f19e2', '64dca130feb4b9a31b4f19e5'],
    description: 'Danh sách _id của các category gắn với bài viết',
    type: [String],
  })
  @IsArray()
  category_id: string[];
}

