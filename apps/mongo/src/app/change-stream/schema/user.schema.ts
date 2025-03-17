import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../lib/enum/Role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, default: 0, min: 0 })  
  balance: number; 

  @Prop({ default: Role.USER, enum: Role, type: String })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
