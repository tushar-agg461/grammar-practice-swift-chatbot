import ChatbotService from './chat/chatbot service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { log } from './common/middleware/logger.help';
import { Response } from 'express';

@Controller()
export class AppController {
  UserService: any;
  constructor(private readonly chatbotService: ChatbotService) {}

  @Get('/api/status')
  getStatus(@Res() res: Response) {
    res.status(200).send({
      status: 200,
      message: 'ok',
    });
  }
  @Post('/message')
  async handelUserMessage(@Body() body, @Res() res): Promise<void> {
    try {
      const { from, text, type } = body;
      let id = this.chatbotService.processMessage(text.body, body.from);
      log(body.from, body.text);
      res.send({
        status: 200,
        message: 'Success',
      });
    } catch (error) {
      res.send(error);
    }
  }
}
