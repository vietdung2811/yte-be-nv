import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { CommentService } from './post.comment.service';
import { CreateCommentDto } from './dto/create-post.comment.dto';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    return this.commentService.create(+postId, dto); // 👈 ép về number ở đây luôn
  }

  @Get()
  findByPost(@Param('postId') postId: string) {
    return this.commentService.findByPost(+postId); // 👈 ép ở đây luôn cho chắc
  }
}
