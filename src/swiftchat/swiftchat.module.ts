// swiftchat.module.ts

import { Module } from '@nestjs/common';
import { SwiftchatService } from './swiftchat.service'; // Update the path to swiftchat.service

@Module({
  providers: [SwiftchatService],
  exports: [SwiftchatService], // Export the SwiftchatService to make it available for other modules
})
export class SwiftchatModule {}
