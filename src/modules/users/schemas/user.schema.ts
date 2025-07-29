import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  appoiments: Date[];

  @Prop()
  createdAt: Date;

  @Prop()
  isDoctor: false;

  @Prop()
  socialId: string;

}

export const UserSchema = SchemaFactory.createForClass(User);