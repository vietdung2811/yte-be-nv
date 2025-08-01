import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment } from './schemas/post.comment.schema';
import { CreateCommentDto } from './dto/create-post.comment.dto';
import { User } from '../users/schemas/user.schema';
import { Post } from '../post/schemas/post.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async create(postId: number, dto: CreateCommentDto) {
    // 1. Kiểm tra post có tồn tại
    const post = await this.postModel.findOne({ _id: Number(postId) });
    if (!post) throw new NotFoundException('Post không tồn tại');

    // 2. Kiểm tra user theo email/phone
    let user = await this.userModel.findOne({
      $or: [{ email: dto.email }, { phone: dto.phone }],
    });

    // 3. Nếu chưa có thì tạo mới
    if (!user) {
      user = await this.userModel.create({
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        address: 'N/A', // default nếu không có
      });
    }

    // 4. Tự tăng _id (vì bạn dùng number)
    const lastComment = await this.commentModel
      .findOne()
      .sort({ _id: -1 })
      .exec();
    const nextId = lastComment ? (lastComment as Comment)._id + 1 : 1;

    // 5. Tạo comment mới
    const newComment = await this.commentModel.create({
      content: dto.content,
      postId: Number(postId),
      authorId: user._id,
    });

    return newComment;
  }

  async findByPost(postId: number) {
    return this.commentModel
      .find({ postId: Number(postId) })
      .populate('authorId', 'name email') // trả lại tên & email của người comment
      .sort({ createdAt: -1 })
      .exec();
  }
}
