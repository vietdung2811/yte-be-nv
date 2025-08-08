import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Category } from '../../post.category/schemas/post.category.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({ collection: 'posts', timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }] })
  category_id: Types.ObjectId[];

  @Prop({ type: Date, default: Date.now })
  created_at: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
