import { Injectable } from '@nestjs/common';
import { SwiftchatService } from '../swiftchat/swiftchat.service';

@Injectable()
export class MessageService {
  constructor(private readonly swiftChat: SwiftchatService) {}

  async sendWelcomeMessage(localisedStrings: string, to: string) {
    console.log(localisedStrings)
    const requestData = {
      to: to,
      type: 'text',
      text: {
        body: localisedStrings,
      },
    };
    console.log(requestData)
    return this.swiftChat.sendRequestToswiftChat(requestData);
  }
}
