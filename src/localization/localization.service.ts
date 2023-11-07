import { Injectable } from '@nestjs/common';
import { localisedStrings as english} from 'src/i18n/en/localised-strings';
import { localisedStrings as hindi} from 'src/i18n/hn/localised-strings';
import { MessageService } from 'src/message/message.service';

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
