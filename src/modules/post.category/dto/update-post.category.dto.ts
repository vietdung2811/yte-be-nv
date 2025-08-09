import { PartialType } from '@nestjs/swagger';
import { CreatePostCategoryDto } from './create-post.category.dto';

export class UpdatePostCategoryDto extends PartialType(CreatePostCategoryDto) {}

// import { PartialType } from '@nestjs/mapped-types';
// import { CreatePostDto } from './create-post.category.dto';
// import { IsOptional, IsArray, IsString } from 'class-validator';

// export class UpdatePostDto extends PartialType(CreatePostDto) {
//   @IsOptional()
//   @IsArray()
//   @IsString({ each: true })
//   categoryIds?: string[];
// }
