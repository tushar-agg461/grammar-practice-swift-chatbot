// swiftchat.module.ts

import { Module } from '@nestjs/common';
import { SwiftchatService } from './swiftchat.service';
import { MessageModule } from 'src/message/message.module'; // Correct the import path as necessary

@Module({
  imports: [MessageModule], // Import MessageModule
  providers: [SwiftchatService],
  exports: [SwiftchatService],
})
export class SwiftchatModule {}
