import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class MockUserService {
  private users: User[] = [];

  async createUser(
    mobileNumber: string,
    language: string,
    botID: string,
  ): Promise<User> {
    // Check if the user already exists
    const existingUser = this.findUserByMobileNumber(mobileNumber, botID);

    if (existingUser) {
      // If user exists, update the language
      existingUser.language = language;
      return existingUser;
    } else {
      // If user does not exist, create a new user
      const newUser = new User();
      newUser.mobileNumber = mobileNumber;
      newUser.language = language;
      newUser.botID = botID;
      this.users.push(newUser); // Add the new user to the array
      return newUser;
    }
  }

  findUserByMobileNumber(
    mobileNumber: string,
    botID: string,
  ): User | undefined {
    // Find the user in the array or return a mock user
    return this.users.find(user => user.mobileNumber === mobileNumber && user.botID === botID) || this.createMockUser();
  }

  async saveUser(user: User): Promise<User> {
    // In a real database, you would save the user. For a mock, just return the user.
    return user;
  }

  private createMockUser(): User {
    // Create and return a mock user
    const mockUser = new User();
    mockUser.mobileNumber = '+919644153550';
    mockUser.language = 'english';
    mockUser.botID = 'mockBotID';
    return mockUser;
  }
}
