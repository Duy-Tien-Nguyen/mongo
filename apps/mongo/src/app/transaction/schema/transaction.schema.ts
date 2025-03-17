import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Types } from "mongoose";
import { TransactionStatus, TransactionType } from "../../lib/enum/Tracsaction.enum";

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ type: Types.ObjectId,ref: 'User', required: true })
  fromUser: Types.ObjectId; 

  @Prop({ type: Types.ObjectId,ref: 'User', required: true })
  toUser: Types.ObjectId; 

  @Prop({ required: true, min: 0 })
  amount: number; 

  @Prop({ enum: TransactionType, required: true, type: String })
  type: TransactionType; 

  @Prop({ enum: TransactionStatus, default: TransactionStatus.PENDING, type: String })
  status?: string; 
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);