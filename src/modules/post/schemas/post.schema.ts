import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ collection: 'posts', timestamps: true })
export class Post {
  @Prop()
  title: string; // Changed from 'name' to 'title' to match your data

  @Prop()
  author: string;

  @Prop()
  content: string;

  @Prop([String]) // Define as array of strings
  category_id: string[]; // Changed from categoryId to category_id and made it an array

  @Prop()
  created_at: Date; // Added created_at field
}

export const PostSchema = SchemaFactory.createForClass(Post);
