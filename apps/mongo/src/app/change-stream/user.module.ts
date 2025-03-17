import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schema/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserChangeStreamService } from "./change-stream.service";

@Module({
    imports:[
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
    ],
    controllers:[UserController],
    providers: [UserService,UserChangeStreamService ],
    exports: [MongooseModule],
})
export class UserModule{}