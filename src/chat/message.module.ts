// message.module.ts

import { Module } from '@nestjs/common';
import { SwiftchatService } from 'src/swiftchat/swiftchat.service';
import { MessageService } from './message.service'; // Update the path to message.service

@Module({
  providers: [MessageService, SwiftchatService],
  exports: [MessageService],
})
export class MessageModule {}
