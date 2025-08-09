// import { PartialType } from '@nestjs/mapped-types';
// import { CreatePostDto } from './create-post.dto';

// export class UpdatePostDto extends PartialType(CreatePostDto) {}

import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsArray, IsString } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  categoryIds?: string[];
}
