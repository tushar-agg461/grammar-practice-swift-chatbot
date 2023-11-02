import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { buttons,createArticleMessage } from '../../i18n/en/button';
import { localisedStrings } from 'src/i18n/en/message';

dotenv.config();

@Injectable()
export class MessageService {
  private botId = process.env.BOT_ID;
  private apiKey = process.env.API_KEY;
  private apiUrl = process.env.API_URL;
  private baseUrl = `${this.apiUrl}/${this.botId}/messages`;

  async sendMessage(localisedStrings:string,to: string) {
    const requestData = {
      to: to,
      type: 'text',
      text: {
        body: localisedStrings
      },
    };
    return this.sendRequestToswiftChat(requestData);
  }
  async sendRequestToswiftChat(requestData: any) {
    try {
      const response = await axios.post(this.baseUrl, requestData, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sendButtonMessage(recipientMobile: string) {
    let request = await buttons(recipientMobile);
    return this.sendRequestToswiftChat(request);
  }

  async sendArticleMessage(recipientMobile: string) {
    let article   = await createArticleMessage(recipientMobile)
    return await this.sendRequestToswiftChat(article);
  }
}
