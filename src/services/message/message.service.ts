import { Injectable } from '@nestjs/common';
import { SwiftchatService } from '../swiftchat/swiftchat.service';

@Injectable()
export class MessageService {
  constructor(private readonly swiftChat: SwiftchatService) {}

  async sendWelcomeMessage(localisedStrings: string, to: string) {
    const requestData = {
      to: to,
      type: 'text',
      text: {
        body: localisedStrings,
      },
    };
    return this.swiftChat.sendRequestToswiftChat(requestData);
  }
}
