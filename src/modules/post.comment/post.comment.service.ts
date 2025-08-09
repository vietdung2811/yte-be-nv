import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { CreateCommentDto } from './dto/create-post.comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(postId: string, dto: CreateCommentDto) {
    // Kiểm tra post tồn tại
    const postExists = await this.prisma.posts.findUnique({
      where: { id: postId },
    });
    if (!postExists) {
      throw new NotFoundException(`Post ${postId} không tồn tại`);
    }

    // Tìm user theo email hoặc phone
    let user = await this.prisma.users.findFirst({
      where: {
        OR: [{ email: dto.email }, { phone: dto.phone }],
      },
    });

    // Nếu chưa có thì tạo mới
    if (!user) {
      user = await this.prisma.users.create({
        data: {
          name: dto.name,
          email: dto.email,
          phone: dto.phone,
          address: 'N/A',
        },
      });
    }

    // Tạo comment mới
    return this.prisma.comments.create({
      data: {
        content: dto.content,
        postId: postId,
        userId: user.id,
      },
    });
  }

  async findAllByPost(postId: string) {
    return this.prisma.comments.findMany({
      where: { postId },
      include: {
        users: {
          select: { name: true, email: true, phone: true },
        },
      },
    });
  }

  async countCommentsByPostId(postId: string) {
    const totalComments = await this.prisma.comments.count({
      where: { postId },
    });

    return { postId, totalComments };
  }

  async delete(commentId: string) {
    const comment = await this.prisma.comments.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment không tồn tại');
    }

    await this.prisma.comments.delete({
      where: { id: commentId },
    });
  }
}
