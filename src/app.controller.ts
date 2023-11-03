import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { MessageService } from './services/message/message.service';
import { IntentClassifierService } from './services/intent-classifier/intent-classifier.service';
import { UserService } from './database/query';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@Controller()
export class AppController {
  UserService: any;
  constructor(
    private readonly message: MessageService,
    private readonly intentClassifierService: IntentClassifierService,
    private readonly userService: UserService,
  ) {}
  @UseInterceptors(CacheInterceptor) // Automatically cache the response for this endpoint
  @CacheTTL(30)
  @Get(`/api/users`)
  async getUsers() {
    return  "authenticated"
  }

  @Post('/webhook')
  async handelUserMessage(@Body() body): Promise<void> {
    try {
      const { from, text, type } = body;
      let intent = await this.intentClassifierService.classifyIntent(
        type,
        body,
      );
      switch (intent) {
        case 'text':
          await this.message.sendWelcomeMessage(text, from);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
