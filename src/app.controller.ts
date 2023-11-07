import { localisedStrings } from './i18n/en/message';
import { MessageService } from './chat/message.service';
import IntentClassifier from './intent/intent-classifier.service';
import ChatbotService from './intent/Chatbot service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { LoggingService } from './common/middleware/logger.middleware';
import { log } from './common/middleware/logger.help';


@Controller()
export class AppController {
  UserService: any;
  constructor(
    private readonly message: MessageService,
    private readonly intentClassifierService: IntentClassifier,
    private readonly chatbotService: ChatbotService,
    private readonly logginService: LoggingService
  ) {}

  @Get(`/api/status`)
  async getStauas() {
    return {
      staus: 200,
      message:"ok"
    };
  }

  @Post('/message')
  async handelUserMessage(@Body() body, @Res() res): Promise<void> {
    try {
      const { from, text, type } = body;
      let id = this.chatbotService.processMessage(text.body,body.from);
      log(body.from,body.text,)
      res.send({
        status: 200,
        message:"Success"
      })
    } catch (error) {
      res.send(error)
    }
  }
}