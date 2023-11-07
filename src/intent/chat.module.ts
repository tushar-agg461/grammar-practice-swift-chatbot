// chatbot.module.ts

import { Module } from '@nestjs/common';
import IntentClassifier from './intent-classifier.service';
import ChatbotService from './Chatbot service';
import { SwiftchatModule } from 'src/swiftchat/swiftchat.module'; // Correct the import path as necessary

@Module({
  imports: [SwiftchatModule], // Import SwiftchatModule
  providers: [ChatbotService, IntentClassifier],
  exports: [ChatbotService, IntentClassifier],
})
export class ChatbotModule {}
