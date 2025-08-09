import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    return this.prisma.posts.create({
      data: {
        author: createPostDto.author,
        title: createPostDto.title,
        content: createPostDto.content,
        category_id: createPostDto.categoryIds || [],
        created_at: new Date(),
      },
    });
  }

  async findAll() {
    return this.prisma.posts.findMany({
      orderBy: { created_at: 'desc' },
    });
  }

  async findOne(id: string) {
    const post = await this.prisma.posts.findUnique({
      where: { id },
    });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return post;
  }

  async findByCategory(categoryId: string) {
    return this.prisma.posts.findMany({
      where: {
        category_id: { has: categoryId }, // Prisma array filter
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async countByCategory(categoryId: string) {
    return this.prisma.posts.count({
      where: {
        category_id: { has: categoryId },
      },
    });
  }

  async getLatestThree() {
    return this.prisma.posts.findMany({
      orderBy: { created_at: 'desc' },
      take: 3,
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      return await this.prisma.posts.update({
        where: { id },
        data: {
          author: updatePostDto.author,
          title: updatePostDto.title,
          content: updatePostDto.content,
          category_id: updatePostDto.categoryIds || undefined,
          updated_at: new Date(),
        },
      });
    } catch {
      throw new NotFoundException(`Post #${id} not found`);
    }
  }

  async findCategoriesByPostId(postId: string) {
  const post = await this.prisma.posts.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new NotFoundException(`Post với ID ${postId} không tồn tại`);
  }

  if (!post.category_id || post.category_id.length === 0) {
    return [];
  }

  // Debug thử cái này coi mảng id có đúng ko
  console.log('Category IDs:', post.category_id);

  return this.prisma.categories.findMany({
    where: {
      id: { in: post.category_id },
    },
  });
}

  async remove(id: string) {
    try {
      await this.prisma.posts.delete({
        where: { id },
      });
    } catch {
      throw new NotFoundException(`Post #${id} not found`);
    }
  }
}
