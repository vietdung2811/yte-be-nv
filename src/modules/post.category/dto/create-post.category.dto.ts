import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostCategoryDto {
  @ApiProperty({ example: 'Genetics', description: 'Tên chuyên mục bài viết' })
  @IsString()
  name: string;
}

// import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

// export class CreatePostDto {
//   @IsString()
//   @IsNotEmpty()
//   author: string;

//   @IsString()
//   @IsNotEmpty()
//   title: string;

//   @IsString()
//   @IsNotEmpty()
//   content: string;

//   @IsOptional()
//   @IsArray()
//   @IsString({ each: true })
//   categoryIds?: string[];
// }
