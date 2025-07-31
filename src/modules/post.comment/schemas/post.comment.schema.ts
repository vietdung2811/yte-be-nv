import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Comment extends Document {
  declare _id: number; // 👈 override type _id

  @Prop({ required: true })
  content: string;

  @Prop({ type: Number, ref: 'Post', required: true })
  postId: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
