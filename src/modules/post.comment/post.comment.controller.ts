import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CommentService } from './post.comment.service';
import { CreateCommentDto } from './dto/create-post.comment.dto';
import { ParseIntPipe } from '@nestjs/common';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentService.create(postId, dto);
  }

  @Get()
  findByPost(@Param('postId') postId: string) {
    return this.commentService.findByPost(+postId); // 👈 ép ở đây luôn cho chắc
  }
}
