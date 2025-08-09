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
        createdAt: new Date(),
        // Nếu muốn gắn category khi tạo
        postCategories: createPostDto.categoryIds
          ? {
              create: createPostDto.categoryIds.map((catId) => ({
                category: { connect: { id: catId } },
              })),
            }
          : undefined,
      },
    });
  }

  async findAll() {
    return this.prisma.posts.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        postCategories: {
          include: { category: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const post = await this.prisma.posts.findUnique({
      where: { id },
      include: {
        postCategories: {
          include: { category: true },
        },
      },
    });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return post;
  }

  async findByCategory(categoryId: string) {
    return this.prisma.posts.findMany({
      where: {
        postCategories: {
          some: { categoryId },
        },
      },
      orderBy: { createdAt: 'desc' },
      include: {
        postCategories: {
          include: { category: true },
        },
      },
    });
  }

  async findCategoriesByPostId(postId: string) {
    const post = await this.prisma.posts.findUnique({
      where: { id: postId },
      include: {
        postCategories: {
          include: { category: true },
        },
      },
    });

    if (!post) {
      throw new NotFoundException(`Không tìm thấy post với id: ${postId}`);
    }

    // Lấy mảng categories
    return post.postCategories.map((pc) => pc.category);
  }

  async countByCategory(categoryId: string) {
    return this.prisma.posts.count({
      where: {
        postCategories: {
          some: { categoryId },
        },
      },
    });
  }

  async getLatestThree() {
    return this.prisma.posts.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: {
        postCategories: {
          include: { category: true },
        },
      },
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
          // Nếu muốn update category
          postCategories: updatePostDto.categoryIds
            ? {
                deleteMany: {}, // xóa category cũ
                create: updatePostDto.categoryIds.map((catId) => ({
                  category: { connect: { id: catId } },
                })),
              }
            : undefined,
        },
      });
    } catch {
      throw new NotFoundException(`Post #${id} not found`);
    }
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
