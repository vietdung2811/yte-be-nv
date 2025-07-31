// post.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = new this.postModel(createPostDto);
    return newPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postModel.findById(id).exec();
    if (!post) throw new NotFoundException(`Post #${id} not found`);
    return post;
  }//api placeholder

  async findByCategory(category_id: number): Promise<Post[]> {
  return this.postModel.find({ category_id }).exec();
}
  async countByCategory(category_id: number): Promise<number> {
    return this.postModel.countDocuments({ category_id }).exec();
  }
  
  async getLatestThree(): Promise<Post[]> {
    return this.postModel.find().sort({ createdAt: -1 }).limit(3).exec();
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const updated = await this.postModel.findByIdAndUpdate(id, updatePostDto, {
      new: true,
    });
    if (!updated) throw new NotFoundException(`Post #${id} not found`);
    return updated;
  }//api placeholder

  async remove(id: number): Promise<void> {
    const res = await this.postModel.findByIdAndDelete(id);
    if (!res) throw new NotFoundException(`Post #${id} not found`);
  }//api placeholder

} 

