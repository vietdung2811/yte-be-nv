import { Module } from '@nestjs/common';

import { PostCategoryService } from './post.category.service';
import { PostCategoryController } from './post.category.controller'; // 👈 nhớ import controller
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [PostCategoryController], // 👈 khai báo controller ở đây
  providers: [PostCategoryService, PrismaService],
  exports: [PostCategoryService], // tuỳ nếu dùng service ở module khác
})
export class PostCategoryModule {}
