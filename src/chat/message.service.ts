import { Injectable } from '@nestjs/common';
import { SwiftchatService } from 'src/swiftchat/swiftchat.service';
import { localisedStrings } from 'src/i18n/en/message';

@Injectable()
export class MessageService {
  constructor(
    private readonly swiftChat: SwiftchatService,
  ) {}

  async sendWelcomeMessage(from: string) {
    let wellcomeMessage = await localisedStrings.welcomeMessage; 
    const requestData = {
      to: from,
      type: 'text',
      text: {
        body: wellcomeMessage, 
      },
    };
    return this.swiftChat.sendRequestToswiftChat(requestData);
  }
}
