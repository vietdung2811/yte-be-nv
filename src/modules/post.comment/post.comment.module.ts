import { Module } from '@nestjs/common';
import { CommentController } from './post.comment.controller';
import { CommentService } from './post.comment.service';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
})
export class PostCommentModule {}
