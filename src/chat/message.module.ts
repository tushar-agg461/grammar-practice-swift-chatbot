// message.module.ts

import { Module } from '@nestjs/common';
import { MessageService } from './message.service'; // Update the path to message.service
import { CustomException } from 'src/common/exception/custom.exception';

@Module({
  providers: [MessageService, CustomException],
  exports: [MessageService, CustomException],
})
export class MessageModule {}
