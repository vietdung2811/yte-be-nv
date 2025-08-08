// post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = new this.postModel({
      ...createPostDto,
      created_at: new Date(),
    });
    return post.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().sort({ created_at: -1 }).exec();
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).exec();
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return post;
  }

  async findByCategory(category_id: string): Promise<Post[]> {
    const posts = await this.postModel
      .find({ category_id: category_id })
      .sort({ created_at: -1 })
      .exec();
    
    return posts;
  }

  async findCategoriesByPostId(postId: string) {
  const post = await this.postModel
    .findById(postId)
    .populate('category_id') // 👈 load thông tin chi tiết category
    .exec();

  if (!post) {
    throw new NotFoundException(`Không tìm thấy post với id: ${postId}`);
  }

  return post.category_id; // Trả về danh sách categories của post
}

  async countByCategory(category_id: string): Promise<number> {
    const count = await this.postModel
      .countDocuments({ category_id: category_id })
      .exec();
    
    return count;
  }

  async getLatestThree(): Promise<Post[]> {
    return this.postModel.find().sort({ created_at: -1 }).limit(3).exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const updated = await this.postModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
    });
    if (!updated) throw new NotFoundException(`Post #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const res = await this.postModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException(`Post #${id} not found`);
  }
}
