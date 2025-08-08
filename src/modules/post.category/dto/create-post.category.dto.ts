import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostCategoryDto {
  @ApiProperty({ example: 'Genetics', description: 'Tên chuyên mục bài viết' })
  @IsString()
  name: string;
}
