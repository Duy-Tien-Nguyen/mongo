import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { faker } from '@faker-js/faker';
import { Role } from "../lib/enum/Role.enum";
import { CreateUserDto } from "./dto/CreateUser.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userModel.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      throw new BadRequestException( error );
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      return this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async fakeUsers(count: number): Promise<any> {
    try {
      const fakeUsers: CreateUserDto[] = [];

      for (let i = 0; i < count; i++) {
        fakeUsers.push({
          name: faker.person.firstName(),
          email: faker.internet.email(),
          age: faker.number.int({ min: 18, max: 60 }),
          role: faker.helpers.arrayElement(Object.values(Role)),
        });
      }

      return await this.userModel.insertMany(fakeUsers);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
