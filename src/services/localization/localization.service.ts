import { Injectable } from '@nestjs/common';
import { localisedStrings as hindiMessage} from 'src/i18n/en/message';
import { MessageService } from '../message/message.service';

@Injectable()
export class LocalizationService {
  constructor(private readonly messageService: MessageService) {}

 getWelcomeMessage = async (language, to) => {
    switch (language) {
      case 'English':
        await hindiMessage
        break;
      default:
        break;
    }
  };
}
