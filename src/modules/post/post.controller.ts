import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiProperty, ApiOkResponse, ApiTags } from '@nestjs/swagger';

class CategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}

export class CategoriesResponseDto {
  @ApiProperty({ type: [CategoryDto] }) // chú ý đây là mảng
  categories: CategoryDto[];
}

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get('latest/3')
  getLatestThree() {
    return this.postService.getLatestThree();
  }

  @Get('category/count/:id')
  countByCategory(@Param('id') categoryId: string) {
    return this.postService.countByCategory(categoryId);
  }

  @Get('category/:id')
  findByCategory(@Param('id') categoryId: string) {
    return this.postService.findByCategory(categoryId);
  }

  @ApiOkResponse({ type: [CategoryDto] }) 
  @Get(':id/categories')
  getCategories(@Param('id') postId: string) {
    return this.postService.findCategoriesByPostId(postId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
