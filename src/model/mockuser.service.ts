import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class MockUserService {
  async createUser(
    mobileNumber: string,
    language: string,
    botID: string,
  ): Promise<User> {
    const user = new User();
    user.mobileNumber = mobileNumber;
    user.language = language;
    user.botID = botID;
    return user;
  }
  async findUserByMobileNumber(
    mobileNumber: string,
  ): Promise<User | undefined> {
    const user = new User();
    user.mobileNumber = mobileNumber;
    user.language = 'english';
    user.botID = '123';
    return user;
  }

  async saveUser(user: User): Promise<User | undefined> {
    return user;
  }
}
