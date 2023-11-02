import { Injectable } from '@nestjs/common';
import { MessageService } from '../message/message.service';

@Injectable()
export class IntentClassifierService {
  constructor(private readonly MessageService: MessageService) {}

  async classifyIntent(type: string, body: any) {
    if (type === 'text') {
      return 'text';
    } else if (type === 'persistent_menu_response') {
      return 'persistent_menu_response';
    } else if (type === 'button_response') {
      return 'button_response';
    }
  }
}
