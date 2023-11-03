import { Injectable } from '@nestjs/common';
import { buttons, createArticleMessage } from '../../i18n/en/button';
import { SwiftchatService } from '../swiftchat/swiftchat.service';

@Injectable()
export class MessageService {
  constructor(private readonly swiftChat: SwiftchatService) {}

  async sendMessage(localisedStrings: string, to: string) {
    const requestData = {
      to: to,
      type: 'text',
      text: {
        body: localisedStrings,
      },
    };
    return this.swiftChat.sendRequestToswiftChat(requestData);
  }

  async sendButtonMessage(recipientMobile: string) {
    let request = await buttons(recipientMobile);
    return this.swiftChat.sendRequestToswiftChat(request);
  }

  async sendArticleMessage(recipientMobile: string) {
    let article = await createArticleMessage(recipientMobile);
    return await this.swiftChat.sendRequestToswiftChat(article);
  }
}
