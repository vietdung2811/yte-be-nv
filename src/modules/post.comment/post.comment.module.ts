import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './post.comment.controller';
import { CommentService } from './post.comment.service';

import { Comment, CommentSchema } from './schemas/post.comment.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { Post, PostSchema } from '../post/schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: User.name, schema: UserSchema },
      { name: Post.name, schema: PostSchema },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class PostCommentModule {}
