import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ collection: 'post', timestamps: true }) 
export class Post {
  @Prop()
  name: string;

  @Prop()
  author: string;

  @Prop()
  content: string;

  @Prop()
  createdAt: Date;

  @Prop()
  categoryId: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
