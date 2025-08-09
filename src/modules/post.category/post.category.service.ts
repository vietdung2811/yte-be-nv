import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePostCategoryDto } from './dto/create-post.category.dto';
import { UpdatePostCategoryDto } from './dto/update-post.category.dto';

@Injectable()
export class PostCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePostCategoryDto) {
    return this.prisma.categories.create({
      data: {
        name: dto.name,
      },
    });
  }

  async findAll() {
    return this.prisma.categories.findMany({
      include: { posts: true }, // nếu muốn lấy luôn bài viết
    });
  }

  async findOne(id: string) {
    const category = await this.prisma.categories.findUnique({
      where: { id },
      include: { posts: true },
    });

    if (!category) {
      throw new NotFoundException(`Không tìm thấy category với id ${id}`);
    }
    return category;
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
    } catch {
      throw new NotFoundException(`Không tìm thấy category để xóa`);
    }
  }
}
