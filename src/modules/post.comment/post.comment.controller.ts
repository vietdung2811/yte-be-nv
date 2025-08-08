import { Controller, Post, Param, Body, Get, Delete } from '@nestjs/common';
import { CommentService } from './post.comment.service';
import { CreateCommentDto } from './dto/create-post.comment.dto';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(
    @Param('postId') postId: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentService.create(postId, dto);
  }

  @Get()
  findAllByPost(@Param('postId') postId: number) {
    return this.commentService.findAllByPost(postId);
  }

  @Delete(':commentId')
  delete(@Param('commentId') commentId: string) {
    return this.commentService.delete(commentId);
  }
}
