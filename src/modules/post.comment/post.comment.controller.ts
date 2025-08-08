import { Controller, Post, Param, Body, Get, Delete } from '@nestjs/common';
import { CommentService } from './post.comment.service';
import { CreateCommentDto } from './dto/create-post.comment.dto';
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('posts/:postId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(
    @Param('postId') postId: string, // Đổi từ number sang string
    @Body() dto: CreateCommentDto,
  ) {
    return this.commentService.create(postId, dto);
  }

  @Get()
  findAllByPost(@Param('postId') postId: string) {
    return this.commentService.findAllByPost(postId);
  }

  @Get('/report/comment-count/:postId')
  @ApiOperation({ summary: 'Đếm số comment của một bài post' })
  @ApiParam({ name: 'postId', required: true, description: 'ID của bài viết' })
  @ApiResponse({
    status: 200,
    description: 'Số comment của bài viết',
    schema: {
      type: 'object',
      properties: {
        postId: { type: 'string', example: '64fd2137e4a19e39dd54efcb' },
        totalComments: { type: 'number', example: 3 },
      },
    },
  })
  getCommentCountByPostId(@Param('postId') postId: string) {
    return this.commentService.countCommentsByPostId(postId);
  }
  
  @Delete(':commentId')
  delete(@Param('commentId') commentId: string) {
    return this.commentService.delete(commentId);
  }
}
