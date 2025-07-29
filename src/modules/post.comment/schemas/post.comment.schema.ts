import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment extends Document {
  @Prop({ required: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'articles', required: true })
  postId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'users', required: true })
  authorId: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);