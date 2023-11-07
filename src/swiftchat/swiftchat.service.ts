import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MessageService } from 'src/chat/message.service';

dotenv.config();

@Injectable()
export class SwiftchatService {

  private botId = process.env.BOT_ID;
  private apiKey = process.env.API_KEY;
  private apiUrl = process.env.API_URL;
  private baseUrl = `${this.apiUrl}/${this.botId}/messages`;

  constructor(private readonly messageService: MessageService) {}

  async sendWelcomeMessage(from: string) {
    try {
      const welcomeMessage = await this.messageService.prepareWelcomeMessage();
      const requestData = {
        to: from,
        type: 'text',
        text: {
          body: welcomeMessage,
        },
      };

      const response = await this.messageService.sendMessage(this.baseUrl, requestData, this.apiKey);
      return response;
    } catch (error) {
      // Handle errors
    }
  }

  async sendButtonMessage(recipientMobile: string) {
    try {
      const buttonLabel = this.messageService.getSeeMoreButtonLabel();
      const requestData = {
        to: recipientMobile,
        type: 'button',
        button: {
          body: {
            type: 'text',
            text: {
              body: buttonLabel,
            },
          },
          buttons: [
            
            // Your button data here
          ],
          allow_custom_response: false,
        },
      };

      const response = await this.messageService.sendMessage(this.baseUrl, requestData, this.apiKey);
      return response;
    } catch (error) {
      // Handle errors
    }
  }
}
