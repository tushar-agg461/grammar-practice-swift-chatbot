// chatbot.module.ts

import { Module } from '@nestjs/common';
import ChatbotService from './chatbot service';
import { SwiftchatModule } from 'src/swiftchat/swiftchat.module'; // Correct the import path as necessary
import IntentClassifier from '../intent/intent.classifier';

@Module({
  imports: [SwiftchatModule], // Import SwiftchatModule
  providers: [ChatbotService, IntentClassifier],
  exports: [ChatbotService, IntentClassifier],
})
export class ChatbotModule {}
