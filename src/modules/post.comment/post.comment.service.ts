import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './schemas/post.comment.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Post, PostDocument } from '../post/schemas/post.schema';
import { CreateCommentDto } from './dto/create-post.comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async create(postId: string, dto: CreateCommentDto): Promise<Comment> {
    // Validate ObjectId
    if (!Types.ObjectId.isValid(postId)) {
      throw new NotFoundException(`ID post không hợp lệ`);
    }

    const postExists = await this.postModel.exists({ _id: postId });
    if (!postExists) {
      throw new NotFoundException(`Post ${postId} không tồn tại`);
    }

    // Tìm user theo email hoặc phone
    let user = await this.userModel.findOne({
      $or: [{ email: dto.email }, { phone: dto.phone }],
    });

    if (!user) {
      user = new this.userModel({
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        address: 'N/A',
      });
      await user.save();
    }

    const comment = new this.commentModel({
      content: dto.content,
      postId: new Types.ObjectId(postId),
      authorId: user._id,
    });

    return comment.save();
  }

  async findAllByPost(postId: string): Promise<Comment[]> {
    if (!Types.ObjectId.isValid(postId)) {
      throw new NotFoundException(`ID post không hợp lệ`);
    }

    return this.commentModel
      .find({ postId: new Types.ObjectId(postId) })
      .populate('authorId', 'name email phone')
      .exec();
  }

  async delete(commentId: string): Promise<void> {
    const comment = await this.commentModel.findById(commentId);
    if (!comment) {
      throw new NotFoundException('Comment không tồn tại');
    }
    await comment.deleteOne();
  }
}
