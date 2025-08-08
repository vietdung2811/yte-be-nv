import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './schemas/post.category.schema';
import { CreatePostCategoryDto } from './dto/create-post.category.dto';
import { UpdatePostCategoryDto } from './dto/update-post.category.dto';

@Injectable()
export class PostCategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<CategoryDocument>,
  ) {}

  async create(dto: CreatePostCategoryDto): Promise<Category> {
    const created = new this.categoryModel(dto);
    return created.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Không tìm thấy category với id ${id}`);
    }
    return category;
  }

  async update(id: string, dto: UpdatePostCategoryDto): Promise<Category> {
    const updated = await this.categoryModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException(`Không tìm thấy category để cập nhật`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Không tìm thấy category để xóa`);
    }
  }
}
