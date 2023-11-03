import { Injectable } from '@nestjs/common';
import { localisedStrings as english} from 'src/i18n/en/message';
import { localisedStrings as hindi} from 'src/i18n/hn/message';
import { MessageService } from '../message/message.service';

@Injectable()
export class LocalizationService {
  constructor(private readonly messageService: MessageService) {}

  
 getWelcomeMessage = async (language) => {
    switch (language) {
      case 'English':
        await english
        break;
      default:
        await hindi
    }
  };
}
