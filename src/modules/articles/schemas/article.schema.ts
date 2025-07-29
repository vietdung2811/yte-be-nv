import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema({ timestamps: true })
export class Article {
  @Prop()
  name: string;

  @Prop()
  author: string;

  @Prop()
  content: string;

  @Prop()
  createdAt: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);