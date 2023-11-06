// chatbot.module.ts

import { Module } from '@nestjs/common';
import {ChatbotService} from './Chatbot service';
import IntentClassifier from './intent-classifier.service';

@Module({
  providers: [ChatbotService, IntentClassifier],
  exports: [ChatbotService, IntentClassifier], // Export the ChatbotService and IntentClassifier to make them available for other modules
})
export class ChatbotModule {}
