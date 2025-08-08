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

  async create(postId: number, dto: CreateCommentDto): Promise<Comment> {
    const postExists = await this.postModel.exists({ _id: postId });
    if (!postExists) {
      throw new NotFoundException(`Post ${postId} không tồn tại`);
    }

    let user = await this.userModel.findOne({
      $or: [{ email: dto.email }, { phone: dto.phone }],
    });

    if (!user) {
      user = new this.userModel({
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
      });
      await user.save();
    }

    const comment = new this.commentModel({
      content: dto.content,
      postId,
      authorId: user._id as Types.ObjectId,
    });

    return comment.save();
  }

  async findAllByPost(postId: number): Promise<Comment[]> {
    return this.commentModel
      .find({ postId })
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
