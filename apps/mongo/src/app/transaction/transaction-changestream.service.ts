import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from './schema/transaction.schema';

@Injectable()
export class TransactionChangeStreamService implements OnModuleInit {
  constructor(@InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>) {}

  onModuleInit() {
    this.watchTransactionChanges();
  }

  private watchTransactionChanges() {
    const changeStream = this.transactionModel.watch([], { fullDocument: 'updateLookup', showExpandedEvents: true });

    changeStream.on('change', (change) => {
      // console.log(' Change detected in Transaction collection:', change);

      switch (change.operationType) {
        case 'insert':
          console.log(' New Transaction Added:', change);
          break;
        case 'update':
          console.log(' Transaction Updated:', change);
          break;
        case 'delete':
          console.log(' Transaction Deleted:', change);
          break;
        case 'replace':
          console.log(' Transaction Replaced:', change);
          break;
        case 'invalidate':
          console.log(' Change Stream Invalidated:', change);
          break;
        default:
          console.log('⚡ Unknown Change Event:', change);
      }
    });

    changeStream.on('error', (error) => {
      console.error(' Change Stream Error:', error);
      console.error(' Change Stream Error Detail:', JSON.stringify(error));
    });
  }
}
