// src/notification/schemas/notification.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ collection: 'emails', timestamps: true })
export class Notification {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  name?: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
