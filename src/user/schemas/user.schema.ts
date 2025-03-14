import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  collection: 'users',
  versionKey: false,
  autoIndex: true,
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
