import { Injectable } from '@nestjs/common';
import { localisedStrings } from 'src/i18n/en/message';
import axios from 'axios';
import { CustomException } from 'src/common/exception/custom.exception';

@Injectable()
export class MessageService {

  async prepareWelcomeMessage() {
    let welcomeMessage = localisedStrings.welcomeMessage
    return welcomeMessage;
  }

  getSeeMoreButtonLabel() {
    let seeMoreMessage = localisedStrings.seeMoreMessage
    return seeMoreMessage;
  }

  async sendMessage(baseUrl: string, requestData: any, token: string) {
    try {
      const response = await axios.post(baseUrl, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new CustomException(error);
    }
  }
}
