import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './module/user.entity';
import { AppController } from './app.controller';
import { MessageService } from './chat/message.service';
import { LocalizationService } from './localization/localization.service';
import { IntentClassifierService } from './intent-classifier/intent-classifier.service';
import { UserService } from './module/query';
import { SwiftchatService } from './swiftchat/swiftchat.service';
import * as dotenv from 'dotenv';
import { databaseConfig } from './config/database-config.service';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return databaseConfig;
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [
    MessageService,
    LocalizationService,
    IntentClassifierService,
    UserService,
    SwiftchatService,
  ],
})
export class AppModule {}
