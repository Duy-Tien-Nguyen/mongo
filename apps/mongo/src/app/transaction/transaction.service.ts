import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Transaction, TransactionDocument } from "./schema/transaction.schema";
import { CreateTransactionDto } from "./dto/CreateTransaction.dto";
import { TransactionStatus } from "../lib/enum/Tracsaction.enum";
import { User,UserDocument } from "../change-stream/schema/user.schema";
import { ClientSession } from "mongoose";


@Injectable()
export class TransactionService {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
  @InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const session: ClientSession = await this.transactionModel.db.startSession({
      defaultTransactionOptions: { readPreference: "primary" },
    });
    session.startTransaction();

    try {
      const { fromUser, toUser, amount, type } = createTransactionDto;

      const sender = await this.userModel.findById(fromUser).session(session);
      const receiver = await this.userModel.findById(toUser).session(session);

      if (!sender || !receiver) {
        throw new NotFoundException("Người gửi hoặc người nhận không tồn tại!");
      }

      if (sender.balance < amount) {
        throw new BadRequestException("Số dư không đủ để thực hiện giao dịch!");
      }

      sender.balance -= amount;
      await sender.save({ session });

      receiver.balance += amount;
      await receiver.save({ session });

      const transaction = new this.transactionModel({
        fromUser,
        toUser,
        amount,
        type,
        status: TransactionStatus.COMPLETED,
      });

      await transaction.save({ session });

      await session.commitTransaction(); 
      session.endSession();

      return transaction;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new BadRequestException("Giao dịch thất bại: " + error.message);
    }
  }

  async findTransactionById(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id).exec();
    if (!transaction) throw new NotFoundException("Không tìm thấy giao dịch!");
    return transaction;
  }

  async findUserTransactions(userId: string): Promise<Transaction[]> {
    return this.transactionModel.find({
      $or: [{ fromUser: userId }, { toUser: userId }],
    }).exec();
  }

  async updateTransactionStatus(id: string, status: TransactionStatus): Promise<Transaction> {
    const updatedTransaction = await this.transactionModel.findByIdAndUpdate(
      id,
      { status },
      { new: true } 
    ).exec();

    if (!updatedTransaction) throw new NotFoundException("Không tìm thấy giao dịch để cập nhật!");
    return updatedTransaction;
  }
}
