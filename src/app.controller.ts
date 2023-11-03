import { Body, Controller, Post } from '@nestjs/common';
import { MessageService } from './services/message/message.service';
import { DynamicDto } from './dto/user.dto';
import { IntentClassifierService } from './services/intent-classifier/intent-classifier.service';
import { UserService } from './database/query';
@Controller()
export class AppController {
  UserService: any;
  constructor(
    private readonly message: MessageService,
    private readonly intentClassifierService: IntentClassifierService,
    private readonly userService: UserService
  ) {}

  @Post('/webhook')
  async handelUserMessage(@Body() body: DynamicDto): Promise<void> {
    try {
      const { from, text, type } = body;
      let intent = await this.intentClassifierService.classifyIntent(type,body);
      switch (intent) {
        case 'text':
          await this.message.sendMessage(text, from);
          break;
        case 'article':
          await this.message.sendArticleMessage(from);
        case 'button_response':
          await this.message.sendButtonMessage(from);
        case 'persistent_menu_response':
          await this.message.sendButtonMessage(from);
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
