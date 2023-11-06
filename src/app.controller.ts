import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './module/query';
import { localisedStrings } from './i18n/en/message';
import { MessageService } from './chat/message.service';
import IntentClassifier from './intent-classifier/intent-classifier.service';
import ChatbotService from './intent-classifier/Chatbot service';

@Controller()
export class AppController {
  UserService: any;
  constructor(
    private readonly message: MessageService,
    private readonly intentClassifierService: IntentClassifier,
    private readonly chatbotService: ChatbotService,
    private readonly userService: UserService,
  ) {}

  @Get(`/api/status`)
  async getStauas() {
    return {
      staus: 'ok',
    };
  }

  @Post('/message')
  async handelUserMessage(@Body() body): Promise<void> {
    try {
      const { from, text, type } = body;
      let id = this.chatbotService.processMessage(text.body,body.from);
    } catch (error) {
      console.error(error);
    }
  }
}
