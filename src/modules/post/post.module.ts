// // post.module.ts
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { Post, PostSchema } from './schemas/post.schema';
// import { PostService } from './post.service';
// import { PostController } from './post.controller';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
//   ],
//   controllers: [PostController],
//   providers: [PostService],
// })
// export class PostModule {}

import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {}
