import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostCategoryService } from './post.category.service';
import { PostCategoryController } from './post.category.controller'; // 👈 nhớ import controller
import { Category, CategorySchema } from './schemas/post.category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
  ],
  controllers: [PostCategoryController], // 👈 khai báo controller ở đây
  providers: [PostCategoryService],
  exports: [PostCategoryService], // tuỳ nếu dùng service ở module khác
})
export class PostCategoryModule {}
