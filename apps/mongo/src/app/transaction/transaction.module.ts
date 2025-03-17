import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schema/transaction.schema';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { TransactionChangeStreamService } from './transaction-changestream.service';
import { UserModule } from '../change-stream/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    UserModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionChangeStreamService],
  exports: [TransactionService],
})
export class TransactionModule {}
