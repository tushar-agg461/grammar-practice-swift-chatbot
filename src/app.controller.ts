import ChatbotService from './chat/chatbot.service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { log } from './common/middleware/logger.help';
import { Response } from 'express';
import { UserService } from './model/user.service';
import * as dotenv from 'dotenv';
dotenv.config()
@Controller()
export class AppController {
  UserService: any;
  constructor(
    private readonly chatbotService: ChatbotService,
    private readonly langugae: UserService,
  ) {}

  @Get('/api/status')
  getStatus(@Res() res: Response) {
    res.status(200).send({
      status: {
        code: 0,
        message: 'OK',
      },
    });
  }

  @Post('/message')
  async handelUserMessage(@Body() body, @Res() res): Promise<void> {
    console.log(body);
    try {
      const { from, text } = body;
      let botID = process.env.BOT_ID;
      let language = await this.langugae.createUser(
        body.from,
        'english',
        botID,
      );
      this.chatbotService.processMessage(from, text.body);
      log(body.from, text.body);
      res.status(200).send({
        status: {
          code: 0,
          message: 'Success',
        },
      });
    } catch (error) {
      res.status(500).send({
        status: {
          code: 1,
          message: error.message,
        },
      });
    }
  }
}
