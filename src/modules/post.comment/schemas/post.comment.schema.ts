import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Number, ref: 'Post', required: true })
  postId: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  authorId: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
