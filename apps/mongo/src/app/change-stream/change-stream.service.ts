import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class UserChangeStreamService implements OnModuleInit {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  @InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    this.watchUserChanges();
    const result = await this.connection.db.admin().command({ hello: 1 });
    console.log("MongoDB Member:", result.me);
    console.log("Primary:", result.primary);
  }

  private watchUserChanges() {
    const changeStream = this.userModel.watch([], { fullDocument: 'updateLookup', showExpandedEvents: true });

    changeStream.on('change', (change) => {
      // console.log(' Change detected in User collection:', change);

      switch (change.operationType) {
        case 'insert':
          console.log(' New User Added:', change);
          break;
        case 'update':
          console.log(' User Updated:', change);
          break;
        case 'delete':
          console.log(' User Deleted:', change);
          break;
        case 'replace':
          console.log(' User Replaced:', change);
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
