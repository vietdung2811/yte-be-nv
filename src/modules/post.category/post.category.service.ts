import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePostCategoryDto } from './dto/create-post.category.dto';
import { UpdatePostCategoryDto } from './dto/update-post.category.dto';

@Injectable()
export class PostCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePostCategoryDto) {
    return this.prisma.categories.create({
      data: { name: dto.name },
    });
  }

  async findAll() {
    const categories = await this.prisma.categories.findMany();

    // Lấy danh sách post cho từng category
    const categoriesWithPosts = await Promise.all(
      categories.map(async (cat) => {
        const posts = await this.prisma.posts.findMany({
          where: { category_id: { has: cat.id } },
        });
        return { ...cat, posts };
      }),
    );

    return categoriesWithPosts;
  }

  async findOne(id: string) {
    const category = await this.prisma.categories.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Không tìm thấy category với id ${id}`);
    }

    const posts = await this.prisma.posts.findMany({
      where: { category_id: { has: id } },
    });

    return { ...category, posts };
  }

  async update(id: string, dto: UpdatePostCategoryDto) {
    try {
      return await this.prisma.categories.update({
        where: { id },
        data: { name: dto.name },
      });
    } catch {
      throw new NotFoundException(`Không tìm thấy category để cập nhật`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.categories.delete({
        where: { id },
      });

      // Xóa id này khỏi tất cả posts
      await this.prisma.posts.updateMany({
        where: { category_id: { has: id } },
        data: {
          category_id: {
            set: [], // hoặc filter bỏ id đó, tuỳ yêu cầu
          },
        },
      });
    } catch {
      throw new NotFoundException(`Không tìm thấy category để xóa`);
    }
  }
}
